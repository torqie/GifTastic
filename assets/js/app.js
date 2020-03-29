$(document).ready(function () {

  $("#newTopicSubmit").on("click", function() {
    if($("#newTopic").val()) {
      gifTastic.addNewButton($("#newTopic").val());
    }
  });

  $("#button-list").on("click", ".gif-button", function () {
    gifTastic.getGifs($(this).text(), 10);
  });

  $("#images").on("click", ".gif", function() {
    gifTastic.toggleGif($(this));
  });

});
