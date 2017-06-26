var Entry = require('./../js/Entry.js').entry;

$(document).ready(function(){
  $("#journal-form").submit(function(event){
    event.preventDefault();
    $('#output').empty();

    var title = $("#title").val();
    var body = $("#body").val();
    var newEntry = new Entry (title, body);
    var numberOfVowels = newEntry.numberOfVowels();

    $("#output").append("<li>Number of words: " +
                         newEntry.numberOfWords() + "</li>");
    for (var key in numberOfVowels) {
      $('#output').append('<li>' + key + ': ' + numberOfVowels[key] +
                          '</li>');
    }
    $("#output").append('<li>Number of consonants: ' +
        newEntry.numberOfConsonants() + '</li>');

    $('#output').append('<li>Teaser: ' + newEntry.getTeaser() + '</li>');
  });
});
