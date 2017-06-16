var recursive = require("recursive-readdir-synchronous");
var nodeID3 = require("node-id3");

var files = recursive("./Files", [".DS_Store"]);

for (var i = 0; i < files.length; i++) {
  var artistTitleArray = files[i].slice(6).replace(/.mp3/, "").split(" - ");
  var artist = artistTitleArray[0];
  var title = artistTitleArray[1];
  var mp3 = artist + " - " + title;

  // handle other images formats
  var coverImage = "./Temp/" + mp3 + ".jpg";
  // if (!coverImage) { coverImage = "./Temp/" + mp3 + ".png"; }
  // if (!coverImage) { coverImage = "./Temp/" + mp3 + ".gif"; }
  // if (!coverImage) { coverImage = "./Temp/" + mp3 + ".svg"; }
  // if (!coverImage) { coverImage = "./Temp/" + mp3 + ".jpeg"; }
  // https://www.kirupa.com/html5/checking_if_a_file_exists.htm

  var tags = {
    artist: artist,
    title: title,
    album: "",
    composer: "",
    image: coverImage
  };
  var success = nodeID3.write(tags, files[i]);
  console.log(success ? mp3 : "failed: " + mp3);
}
