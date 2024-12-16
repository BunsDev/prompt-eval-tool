// Load environment variables
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const testRoutes = require('./routes/testRoutes'); // Added testRoutes require
const Test = require('./models/testModel'); // Import Test model

// Function to check if required environment variables are set
function checkRequiredConfigurations() {
  const requiredConfigs = [
    'OPENAI_API_KEY', 'OPENAI_MODELS',
    'ANTHROPIC_API_KEY', 'ANTHROPIC_MODELS',
    'GROQ_API_KEY', 'GROQ_MODELS'
  ];
  const missingConfigs = requiredConfigs.filter(config => !process.env[config]);
  if (missingConfigs.length > 0) {
    console.error("Missing required configurations: " + missingConfigs.join(", "));
    process.exit(-1);
  }
}

// Call the check function before attempting to connect to the database or starting the server
checkRequiredConfigurations();

if (!process.env.DATABASE_URL) {
  console.error("Error: config environment variables not set. Please create/edit .env configuration file.");
  process.exit(-1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json( { limit: '50mb' } ));

// Setting the templating engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Database connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  });

app.on("error", (error) => {
  console.error(`Server error: ${error.message}`);
  console.error(error.stack);
});

// Test Routes - Added testRoutes to the middleware stack
app.use(testRoutes);

// Root path response
app.get("/", async (req, res) => {
  try {
    const tests = await Test.find({}).lean();
    tests.forEach(test => {
      test.resultCount = test.scenarios.reduce((acc, scenario) => acc + scenario.results.length, 0);
    });
    res.render("index", { tests });
  } catch (error) {
    console.error(`Failed to fetch tests: ${error.message}`);
    console.error(error.stack);
    res.status(500).send("Error fetching tests.");
  }
});

// If no routes handled the request, it's a 404
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`Unhandled application error: ${err.message}`);
  console.error(err.stack);
  res.status(500).send("There was an error serving your request.");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
