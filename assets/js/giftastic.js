// Global Variables.

var gifTastic = {

  // Variables for the object.
  topics: ["boating", "golfing", "coding", "gaming", "audi", "toyota", "dog", "skydiving", "utah jazz", "gronk"], // Topics to be used at the start of the application.

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

  getData(queryUrl, callback) {
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).done(function (response) {
      callback(response.data);
    });
  },

  getGifs(query, limit) {
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=" + limit;
    this.getData(queryUrl, function(results) {
        if(results.length > 0) {
          for(var i = 0; i < results.length; i++) {
            gifTastic.addGif(results[i]);
          }
        } else {
          $("#images").html("<h3>No Gifs available for that topic.</h3>");
        }
    });
  },

  getGifById(gifId, callback) {
    var queryUrl = "https://api.giphy.com/v1/gifs/" + gifId + "?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    this.getData(queryUrl, function(results) {
      callback(results);
    });
  },

  addGif(gif, favorite = false){
    var imageDiv = $("<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>");

    var card = $("<div class='card'>");

    // Create new image
    var newImage = $("<img class='gif card-img-top'>");
    $(newImage).attr("data-animate", gif.images.fixed_width.url);
    $(newImage).attr("data-still", gif.images.fixed_width_still.url);
    $(newImage).attr("data-state", "still");
    $(newImage).attr("src", gif.images.fixed_width_still.url);

    var cardBody = $("<div class='card-body'>");
    var title =  $("<h6 class='card-title'>").text(gif.title);
    var cardText = $("<div class='card-text'>").text("Rating: " + gif.rating);
    var favBtn = $("<button class='fav btn btn-success'>").text("Add To Favorites")
    $(favBtn).attr("data-id", gif.id)
    $(cardBody).append(title, cardText, favBtn);
    $(card).append(newImage, cardBody);
    $(imageDiv).append(card);

    if(favorite) {
      $(imageDiv).attr("class", "col-12");
      $("#favorites-body").append(imageDiv);
    } else {
      $("#images").append(imageDiv);
    }


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

  addToFavorites(gifId) {
    this.getGifById(gifId, function (results) {
      console.log("fav", results);
      gifTastic.addGif(results, true);
      gifTastic.snackbar("Gif has been added to your favorites.")
    });
  },

  /** -- HELPER METHODS -- **/
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  snackbar(message) {
    sb = $("#snackbar");
    $(sb).text(message);
    $(sb).addClass("show");
    setTimeout(function(){ $(sb).removeClass("show") }, 3000);
  }
};

gifTastic.addButtons();
