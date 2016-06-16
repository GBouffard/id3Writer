var recursive = require("recursive-readdir-synchronous");
var nodeID3 = require("node-id3");
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
    var artistTitleArray = files[i].slice(6).replace(/.mp3/, "").split(" - ");
    var artist = artistTitleArray[0];
    var title = artistTitleArray[1];

    var spotifyAPI = (
      "https://api.spotify.com/v1/search?q=artist:"
      + artist.replace(/ /g, "%20").replace(/'/g, "%27")
      + "%20track:"
      + title.replace(/ /g, "%20").replace(/'/g, "%27")
      + "&type=track"
    );

    setTimeout(function() {
      getJSON(spotifyAPI, function(err, response) {
        var coverUrl = response.tracks.items[0].album.images[0].url;
        download(coverUrl, "albumCover.jpeg");
      });

      // var coverImage = "./albumCover.jpeg";
      // var tags = {
      //   artist: artist,
      //   title: title,
      //   album: "",
      //   composer: "",
      //   image: coverImage
      // };

      // var success = nodeID3.write(tags, files[i]);
      // console.log(success? (artist +' - ' + title) : "failed: " + (artist + ' - ' + title));

    }, i * 5000);
  })(i);
}
