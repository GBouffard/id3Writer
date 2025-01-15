var recursive = require("recursive-readdir-synchronous");
var nodeID3 = require("node-id3");

var files = recursive("./Files", [".DS_Store"]);

for (var i = 0; i < files.length; i++) {
  var songname = files[i].slice(6).replace(/.mp3/, "");

  var tags = {
    artist: "TrAIbal",
    title: songname,
    album: "",
    composer: "TrAIbal",
    image: "./img/logo.jpg",
  };
  var success = nodeID3.write(tags, files[i]);
  console.log(success ? `${songname} ✅` : "failed: " + songname);
}
