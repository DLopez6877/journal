(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//business logic stuff for a particular module
var Entry = function(title, body) {
  this.title = title;
  this.body = body;
};

Entry.prototype.numberOfWords = function() {
  return this.body.split(" ").length;
};

Entry.prototype.numberOfVowels = function() {
  var str = this.body;
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var counter = {
    a: 0,
    e: 0,
    i: 0,
    o: 0,
    u: 0
  };

  str = str.toLowerCase().split("");
  str.forEach(function(letter, index) {
    if (vowels.includes(letter)) {
      switch (letter) {
        case 'a': counter.a += 1; break;
        case 'e': counter.e += 1; break;
        case 'i': counter.i += 1; break;
        case 'o': counter.o += 1; break;
        case 'u': counter.u += 1; break;
      }
    }
  });
  return counter;
};

Entry.prototype.numberOfConsonants = function() {
  var str = this.body.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  var counter = 0;

  str = str.toLowerCase().split("");
  str.forEach(function(letter) {
    if (!vowels.includes(letter) && letter !== " ") {
      counter += 1;
    }
  });
  return counter;
};

Entry.prototype.getTeaser = function() {
  //"hello, how are you today? i am fine. thanks for asking"
  // var regex = /\b(?![\?\.\!])/;
  var body = this.body.match(/\(?[^\.\?\!]+[\.!\?]\)?/g);

  if (body[0].split(" ").length <= 8) {
    return body[0];
  } else {
    var output = "";
    body[0].split(" ").forEach(function(word, index) {
      if (index <= 7) {
        output += word + ' ';
      }
    });
    return output;
  }
};

exports.entry = Entry;

},{}],2:[function(require,module,exports){
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

},{"./../js/Entry.js":1}]},{},[2]);
