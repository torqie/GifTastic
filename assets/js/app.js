$(document).ready(function () {

  $("#newTopicSubmit").on("click", function(event) {
    event.preventDefault();
    const newTopic = $("#new-topic");
    if($(newTopic).val()) {
      gifTastic.topics.push($(newTopic).val());
      gifTastic.addButtons();
      $(newTopic).val("");
    }
  });

  $("#button-list").on("click", ".gif-button", function () {
    gifTastic.offset = 0;
    gifTastic.loadMore = false;
    gifTastic.currentTopic = $(this).text();
    gifTastic.getGifs();

  });

  $("#images, #favorites").on("click", ".gif", function() {
    gifTastic.toggleGif($(this));
  });

  $("#images").on("click", ".fav", function() {
    gifTastic.addToFavorites($(this).attr("data-id"));
  });

  $("body").on("click", "#load-more", function () {
    gifTastic.offset++;
    gifTastic.loadMore = true;
    gifTastic.getGifs();
  });

  $("body").on("click", ".remove", function() {
    gifTastic.removeFromFavorites($(this).attr("data-id"));
    $(this).fadeOut().remove();
  });

  $("#clearFavorites").on("click", function() {
    localStorage.clear();
    gifTastic.favorites = [];
    gifTastic.addToFavoritesFromLocalStorage();
    gifTastic.snackbar("Your item has been removed from your favorites list.");
  });


});
