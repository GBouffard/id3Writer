var recursive = require("recursive-readdir-synchronous");
var nodeID3 = require("node-id3");
const { execSync } = require("child_process");

// mp3s must be in /Files
var files = recursive("./Files", [".DS_Store"]);
const path = '/Users/g...d/Projects/id3Writer/Files/'

for (var i = 0; i < files.length; i++) {
  var songname = files[i].slice(6).replace(/.mp3/, "");

  var tags = {
    artist: "Thulium",
    title: songname,
    album: "",
    composer: "Thulium",
    image: "./img/Thulium.jpg",
  };
  var success = nodeID3.write(tags, files[i]);

  try {
    // Remove the 'Where From' attribute
    execSync(`xattr -d com.apple.metadata:kMDItemWhereFroms "${path}/${songname}.mp3"`);
    console.log(success ? `${songname} ✅` : "failed: " + songname);
  } catch (error) {
    console.log(`${file} - Failed to remove 'Where From':`, error.message);
  }
}
