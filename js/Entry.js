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
