var recursive = require("recursive-readdir-synchronous");
var fs = require("fs");
var request = require("request");

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
    var artist = artist = artistTitleArray[0];
    if (artist.includes(" feat")) {
      artist = artist.split(" feat")[0];
    }

    var title = artistTitleArray[1];
    if (title.includes("(acoustic)")) {
      title = title.split(" (acoustic)")[0];
    } else if (title.includes("(live)")) {
      title = title.split(" (live)")[0];
    } else if (title.includes("(unplugged)")) {
      title = title.split(" (unplugged)")[0];
    } else if (title.includes("cover)")) {
      title = title.split(" (")[0];
    }

    var imageLink = "http://www.thulium69.com/wp-content/uploads/2014/02/AlbumCover.png";
    var mp3 = artistTitleArray[0] + " - " + artistTitleArray[1];
    download(imageLink, "./Temp/" + mp3 + ".jpg");
  })(i);
}
