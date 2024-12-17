const express = require('express');
const { exec } = require('child_process');

const app = express();

app.get('/run-command', (req, res) => {
    // Define the shell command you want to run
    const command = 'ffmpeg';

    console.log("command read");
    // Execute the shell command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing command:', error);
            return res.status(500).send('Error executing command');
        }
        console.log(stdout);
        // Send the command output as the response
        res.send(`<pre>${stdout}</pre>`); // Use <pre> to preserve formatting
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
