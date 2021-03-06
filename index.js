const express = require('express')
const app = express()

exports.run = function(){
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/getFrameRate', function (req, res) {
  getMediaInfo(req.query.path).then(function(file){ 
    if (file.media)
	    res.send("{\"framerate\":"+Math.round(file.media.track[0].framerate)+"}");
    else 
           res.send("{\"framerate\":"+Math.round(file.file.track[0].frameRate)+"}");

}).catch(function(e){
   res.send('{"error":"error"}');

});

})

app.listen(3500, function () {
  console.log('FrameRateService listening on port 3500!')
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

}
