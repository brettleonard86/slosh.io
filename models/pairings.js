const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pairingsSchema = new Schema({
  name: {type: String},
  wines: [{
    name: { type: String },
    longDescription: { type: String, max: 75 },
    wineType: { type: String },
    wineBrand: { type: String },
    varietal: { type: String },
    originCountry: { type: String },
    price: { type: String },
    pairings: [{ type: String }],
    body: [{ type: String }],
    descriptorFlavor: [{ type: String }],
    descriptorUnique: [{ type: String }],
    descriptorStructure: [{ type: String }],
    descriptor_structure: [{ type: String }],
    how_to_serve: [{ type: String }],
    sweetness: [{ type: String }],
    tasting_note: [{ type: String }],
    image: String
  }]

});

const Wines = mongoose.model("Wines", pairingsSchema);

module.exports = Wines;
