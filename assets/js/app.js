$(document).ready(function () {

  $("#newTopicSubmit").on("click", function(event) {
    event.preventDefault();
    if($("#newTopic").val()) {
      gifTastic.topics.push($("#newTopic").val());
      gifTastic.addButtons();
      $("#newTopic").val("");
    }
  });

  $("#button-list").on("click", ".gif-button", function () {
    gifTastic.getGifs($(this).text(), 10);
  });

  $("#images").on("click", ".gif", function() {
    gifTastic.toggleGif($(this));
  });

});
