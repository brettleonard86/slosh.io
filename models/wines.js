const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema({
            wine_Id: { type: String },
            product_Id: { type: String },
            isAvailable: { type: Number },
            name: { type: String },
            shortDescription: { type: String },
            longDescription: { type: String },
            vintage: { type: String },
            setting: { type: String },
            scent: { type: String },
            sparkling: { type: String },
            rose: { type: String },
            wineType: { type: String },
            wineBrand: { type: String },
            varietal: { type: String },
            originState: { type: String },
            originRegion: { type: String },
            originCountry: { type: String },
            price: { type: String },
            pairings: [{ type: String }],
            body: [{ type: String }],
            cider: { type: String },
            closure: [{ type: String }],
            descriptorFlavor: [{ type: String }],
            descriptorUnique: [{ type: String }],
            descriptorStructure: [{ type: String }],
            descriptor_structure: [{ type: String }],
            how_to_serve: [{ type: String }],
            sweetness: [{ type: String }],
            tasting_note: [{ type: String }],
            winemaking: [{ type: String }]
});

const Wines = mongoose.model("Wines", wineSchema);

module.exports = Wines;
