const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wineSchema = new Schema({
            @search.score: 1,
            wine_Id: "520",
            product_Id: "10881",
            isAvailable: 0,
            name: "2013 La Muleta Garnacha",
            shortDescription: "",
            longDescription: "In France and the U.S. it goes by Grenache, in Sardinia it’s Cannonau, but in Spain you’ll find <a target='_blank' href='http://juice.clubw.com/story/many-different-wine-names'>Garnacha</a>. And there, Jumilla’s location on the Mediterranean coast creates the perfect, warm growing region that Garnacha thrives in. With a little heat the grapes ripen slowly, creating higher sugar levels which lead to higher alcohol levels, adding both <a target='_blank' href='http://juice.clubw.com/jargon/body'>body</a> and spice to the wine (a signature Spanish characteristic). \n\nUsing a combination of both modern technology and traditional methods from the historical winemaking region of Jumilla, La Muleta’s flavors portray an authentic Spanish style with the perfect balance of fresh fruit and a little funkiness. It draws you in with dark berry aromas, but on the palate surprises with <a target='_blank' href='http://juice.clubw.com/jargon/spicy'>spicy</a> flavor, rich <a target='_blank' href='http://juice.clubw.com/jargon/earthy'>earthy</a> notes, mouth-puckering acidity, and subtle <a target='_blank' href='http://juice.clubw.com/jargon/tannins'>tannins</a> that get you on the end just where it counts for a long, dry <a target='_blank' href='http://juice.clubw.com/jargon/finish'>finish</a>.",
            vintage: "2013",
            setting: "Date night",
            scent: "Mixed berries, perfume, moss, poblano pepper, white pepper spice",
            sparkling: "",
            rose: "",
            wineType: "red",
            wineBrand: "La Muleta",
            varietal: "Grenache",
            originState: "",
            originRegion: "Jumilla",
            originCountry: "Spain",
            price: "13.00",
            pairings: [
                "Beef",
                "Mexican",
                "Cured Meats"
            ],
            body: [
                "full"
            ],
            cider: "",
            closure: [
                "cork"
            ],
            descriptorFlavor: [],
            descriptorUnique: [],
            descriptorStructure: [],
            descriptor_structure: "[]",
            how_to_serve: "[\"room temperature\"]",
            sweetness: [
                "dry"
            ],
            tasting_note: [],
            winemaking: []
        }
});

const Wines = mongoose.model("Wines", wineSchema);

module.exports = Wines;