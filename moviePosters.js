var recursive = require("recursive-readdir-synchronous");
var fs = require("fs");
var request = require("request");
var getJSON = require("get-json");

var files = recursive("./Movies", [".DS_Store"]);

var download = function(uri, filename){
  "use strict";
  request.head(uri, function(error, res, body){
    request(uri).pipe(fs.createWriteStream(filename));
  });
};

for (var i = 0; i < files.length; i++) {
  (function(index) {
    var movieTitle = files[i].slice(6).replace(/.avi|.wmv|.mpeg|.mp4/, "");

    var imdbAPI = (
      "http://www.omdbapi.com/?y=&plot=short&r=json&t="
      + movieTitle.replace(/ /g, "%20").replace(/'/g, "%27")
    );

    setTimeout(function() {
      getJSON(imdbAPI, function(err, response) {
        var coverUrl = response.Poster;
        if (coverUrl) {
          console.log("cover FOUND for: " + movieTitle);
          download(coverUrl, "./Movies/" + movieTitle + ".jpeg");
        } else {
          console.log("no cover found for: " + movieTitle);
        }
      });
    }, i * 4000);
  })(i);
}
