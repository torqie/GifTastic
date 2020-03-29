// Global Variables.

var gifTastic = {

  // Variables for the object.
  topics: ["boating", "Coding", "Gaming", "Audi", "Toyota", "Dog", "skydiving", "utah jazz", "gronk"], // Topics to be used at the start of the application.

  createButton(name) {
    var button = $("<button>");
    $(button).text(this.capitalizeFirstLetter(name));
    $(button).addClass("btn btn-secondary gif-button mr-2 mb-2");
    $(button).appendTo("#button-list");
  },

  addButtons() {
    $("#button-list").empty();
    for(let i = 0; i < this.topics.length; i++) {
      this.createButton(gifTastic.topics[i]);
    }
  },

  getGifs(query, limit) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      console.log(results.length);

      if(results.length > 0) {
        $("#images>.row").empty();
        for(var i = 0; i < results.length; i++) {
          gifTastic.addGif(results[i]);
        }
      } else {
        $("#images>.row").html("<h3>No Gifs available for that topic.</h3>");
      }

    });
  },

  addGif(gif){
    var imageDiv = $("<div>");
    $(imageDiv).addClass("col-12 col-sm-6 col-md-4 col-lg-3 mb-4");

    var rating = $("<div>");
    $(rating).addClass("rating");
    $(rating).html("Rating: " + gif.rating);

    // Create new image
    var newImage = $("<img>");
    $(newImage).attr("data-animate", gif.images.fixed_width.url);
    $(newImage).attr("data-still", gif.images.fixed_width_still.url);
    $(newImage).attr("data-state", "still");
    $(newImage).attr("src", gif.images.fixed_width_still.url);
    $(newImage).addClass("gif img img-thumbnail");

    $(imageDiv).append(newImage, rating);
    $("#images>.row").prepend(imageDiv);
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

gifTastic.addButtons();
