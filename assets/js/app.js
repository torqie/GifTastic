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


});
