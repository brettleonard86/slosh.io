import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getWineList: function() {
      return axios.get("https://slosh.io/routes/api/alcohol");
    },
    getFood: function(food) {
      return axios.get("https://slosh.io/routes/api/alcohol/" + food + "/" );
    },
    createUser: function(user) {
      return axios.post("/api/user", user);
    }
    };
