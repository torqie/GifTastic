// Global Variables.
const gifTastic = {
  // Variables for the object.
  topics: ["boating", "golfing", "coding", "gaming", "audi", "toyota", "dog", "skydiving", "utah jazz", "gronk"], // Topics to be used at the start of the application.
  offset: 0,
  loadMore: false,
  currentTopic: "",
  favorites: [],

  setFavorites() {
    if(localStorage.getItem("favorites") != null) {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      if (favorites.length > 0) {
        this.favorites = favorites;
      }
    }
  },

  createButton(name) {
    const button = $("<button>");
    $(button).text(this.capitalizeFirstLetter(name));
    $(button).addClass("btn btn-secondary gif-button mr-2 mb-2");
    $(button).appendTo("#button-list");
  },

  addButtons() {
    $("#button-list").empty();
    for (let i = 0; i < this.topics.length; i++) {
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

  getGifs() {
    const queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + this.currentTopic + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&offset=" + this.offset;
    this.getData(queryUrl, function (results) {
      if (results.length > 0) {
        if (!gifTastic.loadMore) {
          $("#images").empty();
        }
        for (let i = 0; i < results.length; i++) {
          gifTastic.addGif(results[i]);
        }
        $("#page-title").text("Showing you gifs on the topic " + gifTastic.currentTopic);
        $("#load-more").fadeIn();
      } else {
        $("#images").empty();
        $("#page-title").text("Sorry, we can not find any gifs on the topic " + gifTastic.currentTopic);
        $("#load-more").hide();
      }
    });
  },

  getGifById(gifId, callback) {
    const queryUrl = "https://api.giphy.com/v1/gifs/" + gifId + "?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
    this.getData(queryUrl, function (results) {
      callback(results);
    });
  },

  addGif(gif, favorite = false) {
    const imageDiv = $("<div class='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'>");

    // Create new image
    const newImage = $("<img src='' class='gif card-img-top' alt=''>");
    $(newImage).attr("data-animate", gif.images.fixed_width.url);
    $(newImage).attr("data-still", gif.images.fixed_width_still.url);
    $(newImage).attr("data-state", "still");
    $(newImage).attr("src", gif.images.fixed_width_still.url);

    if (favorite) {
      $(imageDiv).attr("class", "col-12 mb-3 favorite");

      const removeImageLink = $("<a class='remove' data-id='" + gif.id + "'>");
      const removeImage = $("<img src='https://image.flaticon.com/icons/svg/261/261935.svg' style='width:40px;height:40px'>")
      $(removeImage).appendTo(removeImageLink);
      $(imageDiv).append(newImage, removeImageLink);
      $("#favorites-body").prepend(imageDiv);
    } else {
      const card = $("<div class='card'>");
      const cardBody = $("<div class='card-body'>");
      const title = $("<h6 class='card-title'>").text(gif.title);
      const cardText = $("<div class='card-text'>").text("Rating: " + gif.rating);
      const favBtn = $("<button class='fav btn btn-link card-link'>").text("Add To Favorites");
      $(favBtn).attr("data-id", gif.id);
      $(cardBody).append(title, cardText, favBtn);
      $(card).append(newImage, cardBody);
      $(imageDiv).append(card);
      $("#images").append(imageDiv);
    }
  },

  toggleGif(gif) {
    const state = $(gif).attr("data-state");
    if (state === "still") {
      $(gif).attr("src", $(gif).attr("data-animate"));
      $(gif).attr("data-state", "animate");
    } else {
      $(gif).attr("src", $(gif).attr("data-still"));
      $(gif).attr("data-state", "still");
    }
  },

  addToFavorites(gifId) {
    if(!this.favorites.includes(gifId)) {
      this.favorites.push(gifId);
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
      this.addToFavoritesFromLocalStorage();
      gifTastic.snackbar("Gif has been added to your favorites.");
    }
  },

  removeFromFavorites(gifId) {
    this.favorites = this.favorites.filter(function (ele) {
      return ele != gifId;
    });
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
    this.addToFavoritesFromLocalStorage();
  },

  addToFavoritesFromLocalStorage() {
    $("#favorites-body").empty();
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      for (let i = 0; i < favorites.length; i++) {
        this.getGifById(favorites[i], function (results) {
          gifTastic.addGif(results, true);
        });
      }
    }
  },

  /** -- HELPER METHODS -- **/
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  snackbar(message) {
    const sb = $("#snackbar");
    $(sb).text(message);
    $(sb).addClass("show");
    setTimeout(function () {
      $(sb).removeClass("show")
    }, 3000);
  }
};
gifTastic.addButtons();
gifTastic.addToFavoritesFromLocalStorage();
gifTastic.setFavorites();