const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const ffmpegStatic = require('ffmpeg-static');

const app = express();
const upload = multer({ dest: 'uploads/' });


ffmpeg.setFfmpegPath(ffmpegStatic);

app.get('/',(req,res)=>{
res.sendFile(__dirname+'/ind.html')
});
app.post('/upload', upload.single('video'), (req, res) => {
    const filePath = req.file.path;
    const outputFilePath = path.resolve(__dirname, `output_${Date.now()}.mp4`);
    console.log(outputFilePath);
    console.log(filePath);
    const scaleOptions = ['scale=1280:720', 'scale=640:320'];
    const videoCodec = 'libx264';
const x264Options = 'keyint=24:min-keyint=24:no-scenecut';
const videoBitrates = ['1000k', '2000k', '4000k'];

    ffmpeg()
    
  .input(filePath)
  .videoFilters({
    filter: 'drawtext',
    options: {
        fontfile: 'C:/Windows/Fonts/arial.ttf', 
        text: 'Your Text Here',
        fontsize: 24,
        fontcolor: 'white',
        x: '76',
        y: '76'
    }
})
  .output(outputFilePath)
  .on('end', () => {
    console.log('DASH encoding complete.');
  })
  .on('error', (err) => {
    console.error('Error:', err.message);
  })
  .run();



});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
