const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const child_process = require('child_process');

io.on('connection', socket => {

    const rtmpUrl = 'rtmp://prueba-chiperlive-usso.channel.media.azure.net:1935/live/34b5db24f895431db6f3901c475aabba/mystream1';

    const ffmpeg = child_process.spawn('ffmpeg', [
        '-i','-',

        // video codec config: low latency, adaptive bitrate
        '-c:v', 'libx264', '-preset', 'medium', '-tune', 'zerolatency',

        // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
        '-c:a', 'aac', '-ar', '44100', '-b:a', '128k', '-r', '30', '-g', '60', '-keyint_min', '60', '-b:v', '400000',
        
        //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
        //'-strict', 'experimental',
        '-bufsize', '400k', '-maxrate', '400k',
        '-f', 'flv',

        rtmpUrl
    ]);

    ffmpeg.on('close', (code, signal) => {
        console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
        socket.disconnect(true);
    });

    ffmpeg.stdin.on('error', (e) => {
        console.log('FFmpeg STDIN Error', e);
    });

    ffmpeg.stderr.on('data', (data) => {
        console.log('FFmpeg STDERR:', data.toString());
    });
    
    socket.on('data', (msg) => {
        if (Buffer.isBuffer(msg)) {
            ffmpeg.stdin.write(msg);
        }
    });
    
    socket.on('close', (e) => {
        ffmpeg.kill('SIGINT');
    });
})

server.listen(8080, () => {
    console.log('Server running on port 8080');
})