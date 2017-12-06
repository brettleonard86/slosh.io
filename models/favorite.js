var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var favoriteSchema = new Schema({
  _wineID: {
    type:Schema.Types.ObjectId,
    ref: "Wine"
  },
  date: {
    type: Date,
    default: Date.now
  },
  noteText: String
});

// This creates our model from the above schema, using mongoose's model method
var Favorite = mongoose.model("Wine", favoriteSchema);

// Export the Note model

module.exports = Favorite;