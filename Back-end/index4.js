const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ffmpegStatic = require('ffmpeg-static');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use(cors());

mongoose.connect('mongodb://localhost:27017/rang_rez'); // Removed deprecated options

const videoSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    text: {
        type: Boolean,
        required: true
    },
    image: {
        type: Boolean,
        required: true
    },
    t_x: {
        type: String,
        required: true
    },
    t_y: {
        type: String,
        required: true
    },
    i_x: {
        type: String,
        required: true
    },
    i_y: {
        type: String,
        required: true
    },
    t_limit: {
        type: String,
        required: true
    },
    f_f: {
        type: String,
        required: true
    }
});

// Create the model using the schema
const Video = mongoose.model('Video', videoSchema);

ffmpeg.setFfmpegPath(ffmpegStatic);

app.get('/video/:_id', async (req, res) => {
    try {
        const _id = req.params._id;
        console.log(_id);

        // Fetch the video document from MongoDB
        const video = await Video.findById(_id);

        if (!video) {
            console.log("3243546");
            return res.status(404).send('Video not found');
        }

        // Get the video path from the document
        const videoPath = video.file_path;
    console.log(video);
    console.log("hi");
    console.log(videoPath);
        // Send the video file
        res.sendFile(videoPath, (err) => {
            if (err) {
                console.log("erroorororororo");
                console.error(err);
                res.status(500).send('Error sending the file');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
app.get('/video_p/:_id', async (req, res) => {
    
        try {
            const _id = req.params._id;
            const video = await Video.findById(_id);
            console.log("dfdg");
            console.log(_id);
    
            if (!video) {
                return res.status(404).json({ success: false, message: 'Video not found' });
            }
    
            // Additional processing...
    
            res.json({ success: true, video: video });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Server error', error: err.message });
        }
    });
    


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ind2.html');
});

app.post('/upload', upload.fields([{ name: 'video' }, { name: 'image' }]), (req, res) => {
    const videoPath = req.files['video'][0].path;
    const imagePath = req.files['image'][0].path;
    const outputFilePath = path.resolve(__dirname, `output_${Date.now()}.mp4`);

    console.log('Video Path:', videoPath);
    console.log('Image Path:', imagePath);
    console.log('Output File Path:', outputFilePath);

    ffmpeg()
        .input(videoPath)
        .input(imagePath)
        .complexFilter([
            {
                filter: 'overlay',
                options: { x: '10', y: '10' } // Position the image at coordinates (10, 10)
            }
        ])
        .output(outputFilePath)
        .on('end', () => {
            console.log('Video processing complete.');
            res.download(outputFilePath); // Send the processed video back to the client
        })
        .on('error', (err) => {
            console.error('Error:', err.message);
            res.status(500).send('Video processing failed.');
        })
        .run();
});

app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
});
