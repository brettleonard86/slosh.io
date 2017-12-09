// Headline model
// ==============

// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with our schema class
var userSchema = new Schema({
  // headline, a string, must be entered
  name: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  // emailAddress, a string, must be entered
  email: {
    type: String,
    required: true
  },
  // date is just a string
  date: {
    type: Date,
    default: Date.now
  },
  //this should collect favorite's
  wine: [{
    type: String,
    unique: { index: { unique: true } }
  }]
});

// Create the User model using the userSchema
var User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
