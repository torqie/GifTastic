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
    console.log("You clicked on the " + query + " button");
  },




  /** -- HELPER METHODS -- **/
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
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

