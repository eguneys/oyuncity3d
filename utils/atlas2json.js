var fs = require('fs');

function readToJson(filename, onRead) {
  var tfmatch = /:\s*[t|f]/;
  var vec2match = /:[^\d](\d*),[^\d](\d*)/;

  fs.readFile(filename, 'utf8', function(err, data) {
    var frames = {};

    var lines = data.split('\n');

    for (var i = 6; i<lines.length-1; i+=7) {
      var lframeName = lines[i];
      var lrotated = lines[i+1];
      var lxy = lines[i+2];
      var lsize = lines[i+3];
      var lorig = lines[i+4];
      var loffset = lines[i+5];
      var lindex = lines[i+6];

      var rotatedmatch = lrotated.match(tfmatch);
      var xymatch = lxy.match(vec2match);
      var sizematch = lsize.match(vec2match);
      var origmatch = lorig.match(vec2match);
      var indexmatch = lindex.match(/:[^\d](\d*)/);

      var rotated = rotatedmatch === 'f';
      var x = Number(xymatch[1]);
      var y = Number(xymatch[2]);
      var w = Number(sizematch[1]);
      var h = Number(sizematch[2]);
      var index = indexmatch[1];

      frames[lframeName + index] = {
        rotated, x, y, w, h
      };
    }

    onRead({ frames });
  });

}

function writeToOutput(filename, data) {
  data = JSON.stringify(data);
  fs.writeFile(filename, data, function(err) {
  });
}

(function atlasToJson(infile, outfile) {


  if (!infile || infile === "" ||
      !outfile || outfile === "") {
    console.log('Usage: atlas2json [infile] [outfile]');
    return;
  }
  
  var data = readToJson(infile, function(data) {
    writeToOutput(outfile, data);
  });

})(process.argv[2], process.argv[3]);
