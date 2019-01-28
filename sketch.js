var mysound;
var fft;
var spectrum = [];

function preload() {
    soundFormats('mp3', 'ogg');
    mysound = loadSound('music.mp3', function() { console.log('ok'); }, function(error) { console.log(error); }, {});
    console.log(mysound);
    fft = new p5.FFT();
    fft.setInput(mysound);
}

function setup() {
    createCanvas(500, 500);
    mysound.setVolume(0.5);
    mysound.play();
    mysound.loop();
}

var x = 0;

function draw() {

    spectrum = fft.analyze();
    beginShape();
    //console.log(spectrum[55]);
    background(0);
    stroke(0, 255, 0, 200);
    strokeWeight(3);
    fill(0, 0, 0, 0);
    let maxR = width * 0.5;
    for (var i = 0; i < spectrum.length; i = i + 50) {
        var amp = spectrum[i];
        var locX = width * float(i) / float(spectrum.length);
        var locY = height * 0.5;
        console.log(amp);
        stroke(0, 255, 0, maxR * amp / 255.0);
        var r = maxR * amp / 255.0;
        ellipse(locX, locY, r, r);
    }
    endShape();
}