$(document).ready(function () {

  $("#newTopicSubmit").on("click", function(event) {
    event.preventDefault();
    if($("#new-topic").val()) {
      gifTastic.topics.push($("#new-topic").val());
      gifTastic.addButtons();
      $("#new-topic").val("");
    }
  });

  $("#button-list").on("click", ".gif-button", function () {
    gifTastic.getGifs($(this).text(), 10);
  });

  $("#images, #favorites").on("click", ".gif", function() {
    gifTastic.toggleGif($(this));
  });

  $("#images").on("click", ".fav", function() {
    gifTastic.addToFavorites($(this).attr("data-id"));
  });


});
