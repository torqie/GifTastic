// Global Variables.

var gifTastic = {

  // Variables for the object.
  topics: ["boating", "Coding", "Gaming"], // Topics to be used at the start of the application.


  addNewButton(name) {
    var button = $("<button>");
    $(button).text(this.capitalizeFirstLetter(name));
    $(button).addClass("gif-button");
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
        console.log(results[i].images.fixed_height.url);
        // Create new image
        var newImage = $("<img>");
        $(newImage).attr("data-animate", results[i].images.fixed_height.url);
        $(newImage).attr("data-still", results[i].images.fixed_height_still.url);
        $(newImage).attr("data-state", "still");

        $(newImage).attr("src", results[i].images.fixed_height_still.url);
        $(newImage).addClass("gif");

        $("#images").prepend(newImage);
        console.log(response);
      }


    });
  },



  /** -- HELPER METHODS -- **/
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};


for(let i = 0; i < gifTastic.topics.length; i++) {
  gifTastic.addNewButton(gifTastic.topics[i]);
}






$(document).ready(function () {
  $("#newTopicSubmit").on("click", function(event) {
    event.preventDefault();
    gifTastic.addNewButton($("#newTopic").val());
  });

  $("#button-list").on("click", ".gif-button", function () {
    gifTastic.getGifs($(this).text(), 10);
  });
});

