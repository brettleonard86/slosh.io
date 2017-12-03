import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getWineList: function() {
      return axios.get("/api/alcohol");
    },
    getFood: function(wine) {
      return axios.get("/api/alcohol/", wine);
    },
    createUser: function(user) {
      return axios.post("/api/user", user);
    }
    };
