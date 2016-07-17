var recursive = require("recursive-readdir-synchronous");
var nodeID3 = require("node-id3");

var files = recursive("./Files", [".DS_Store"]);

for (var i = 0; i < files.length; i++) {
  var artistTitleArray = files[i].slice(6).replace(/.mp3/, "").split(" - ");
  var artist = artistTitleArray[0];
  var title = artistTitleArray[1];
  var mp3 = artist + " - " + title;

  var coverImage = "./Temp/" + mp3 + ".jpg";
  var tags = {
    artist: artist,
    title: title,
    album: "",
    composer: "",
    image: coverImage
  };
  var success = nodeID3.write(tags, files[i]);
  console.log(success? mp3 : "failed: " + mp3);
}
