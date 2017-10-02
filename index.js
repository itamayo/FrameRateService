const express = require('express')
const app = express()

exports.run = function(){
app.get('/getFrameRate', function (req, res) {
  res.send('Hello World!'+req.query.test);
})

app.listen(3500, function () {
  console.log('Example app listening on port 3000!')
});

var  mediainfo = require('mediainfo-parser');
function getMediaInfo(filePath) {
  return new Promise(function(resolve, reject) {
    mediainfo.exec(filePath, function(err, info) {
      if(err) return reject(err);
      return resolve(info);
    });
  });
}

getMediaInfo('http://localhost/vicomtech.mp4').then(function(file){
  console.log(Math.round(file.file.track[0].frameRate));
}).catch(function(e){
console.log(e);
});
}
