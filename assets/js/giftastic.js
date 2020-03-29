// Global Variables.

var gifTastic = {

  // Variables for the object.
  topics: ["boating", "Coding", "Gaming", "Audi", "Toyota Tundra"], // Topics to be used at the start of the application.

  addNewButton(name) {
    var button = $("<button>");
    $(button).text(this.capitalizeFirstLetter(name));
    $(button).addClass("btn btn-secondary gif-button mr-2 mb-2");
    $(button).appendTo("#button-list");
  },

  getGifs(query, limit) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;

      for(var i = 0; i < results.length; i++) {

        var imageDiv = $("<div>");
        $(imageDiv).addClass("col-12 col-sm-6 col-md-4 col-lg-3 mb-4");

        var rating = $("<div>");
        $(rating).addClass("rating");
        $(rating).html("Rating: " + results[i].rating);

        // Create new image
        var newImage = $("<img>");
        $(newImage).attr("data-animate", results[i].images.fixed_width.url);
        $(newImage).attr("data-still", results[i].images.fixed_width_still.url);
        $(newImage).attr("data-state", "still");
        $(newImage).attr("src", results[i].images.fixed_width_still.url);
        $(newImage).addClass("gif img img-thumbnail");

        $(imageDiv).append(newImage, rating);
        $("#images>.row").prepend(imageDiv);
      }
    });
  },

  toggleGif(gif) {
    var state = $(gif).attr("data-state");
    if(state === "still") {
      $(gif).attr("src", $(gif).attr("data-animate"));
      $(gif).attr("data-state", "animate");
    } else {
      $(gif).attr("src", $(gif).attr("data-still"));
      $(gif).attr("data-state", "still");
    }
  },

  /** -- HELPER METHODS -- **/
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
//Add the starting buttons
for(let i = 0; i < gifTastic.topics.length; i++) {
  gifTastic.addNewButton(gifTastic.topics[i]);
}