const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), (req, res) => {
    //const filePath = req.file.path;
    const filePath ="C:\\Users\\raghu\\Downloads\\RRR\\Video1.mp4"
    const outputFilePath = path.resolve(__dirname, `output_${Date.now()}.mp4`);

    // Define the FFmpeg command
    const ffmpegCommand =`ffmpeg  "C:/Users/raghu/Downloads/RRR/Video1.mp4" -vf "drawtext=text='Your Text Here':fontfile=C\\:/Windows/Fonts/arial.ttf:fontsize=24:fontcolor=white:x=76:y=76" "C:/Users/raghu/Downloads/RRR/Output_Video1.mp4"`

    // Execute the FFmpeg command
    exec(ffmpegCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing FFmpeg command:', error);
            return res.status(500).send('Error processing video');
        }

        // Log FFmpeg output
        console.log('FFmpeg output:', stdout);
        console.error('FFmpeg stderr:', stderr);

        // Stream the output file
        const readStream = fs.createReadStream(outputFilePath);
        res.setHeader('Content-Disposition', `attachment; filename="${path.basename(outputFilePath)}"`);
        res.setHeader('Content-Type', 'video/mp4');

        readStream.pipe(res);

        readStream.on('end', () => {
            // Clean up files after streaming
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) console.error('Error removing uploaded file:', unlinkErr);
            });
            fs.unlink(outputFilePath, (unlinkErr) => {
                if (unlinkErr) console.error('Error removing output file:', unlinkErr);
            });
        });

        readStream.on('error', (err) => {
            console.error('Error streaming file:', err);
            res.status(500).send('Error streaming file');
        });
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
