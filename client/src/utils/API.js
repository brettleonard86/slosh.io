import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getWineList: function() {
      return axios.get("/api/alcohol");
    },
  getFood: function(food) {
      return axios.get("/api/alcohol?food=" + food.choice);
    },
  createUser: function(user) {
      return axios.post("/api/user", user);
    }
    };
