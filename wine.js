
var key = "369e98n03r482g5zq4dc6lhbevqtj8evpq2ghu4nsvlyy6ai";
var queryURL = "http://api.snooth.com/wines/?akey=" + key + "&q=napa+cabernet&xp=30";

$.ajax({url: queryURL, method: 'GET'})
 .done(function(response) {
     console.log(response);
 });