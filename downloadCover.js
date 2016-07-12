var recursive = require("recursive-readdir-synchronous");
var fs = require("fs");
var request = require("request");
var getJSON = require("get-json");

var files = recursive("./Files", [".DS_Store"]);

var download = function(uri, filename){
  "use strict";
  request.head(uri, function(error, res, body){
    request(uri).pipe(fs.createWriteStream(filename));
  });
};

for (var i = 0; i < files.length; i++) {
  (function(index) {
    if (!files[i].slice(6).includes(" - ")) {
      console.log(files[i].slice(6));
    }
    var artistTitleArray = files[i].slice(6).replace(/.mp3/, "").split(" - ");
    var artist = artistTitleArray[0];
    var title = artistTitleArray[1];
    var mp3 = artist + " - " + title;

    var spotifyAPI = (
      "https://api.spotify.com/v1/search?q=artist:"
      + artist.replace(/ /g, "%20").replace(/'/g, "%27").replace(/!/g, "%21")
      + "%20track:"
      + title.replace(/ /g, "%20").replace(/'/g, "%27").replace(/!/g, "%21")
      + "&type=track"
    );

    setTimeout(function() {
      getJSON(spotifyAPI, function(err, response) {
        var coverUrl;
        if (response.tracks.items[0]) {
          coverUrl = response.tracks.items[0].album.images[0].url;
          download(coverUrl, "./Temp/" + mp3 + ".jpg");
        } else {
          console.log("no cover for: " + mp3);
        }
      });

    }, i * 5000);
  })(i);
}
