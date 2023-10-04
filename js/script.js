let canvas = document.getElementById("loading");
let ctx = canvas.getContext("2d");

let loading_percent = 1;

function setLoadingText(){
    document.getElementById("loading_percent").innerText = (loading_percent + "%");
}

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    // canvas.width = rect.width * dpr;
    // canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

function getSize(size){
    var dpr = window.devicePixelRatio || 1;
    return size / dpr;
}

function trueSize(size){
    var dpr = window.devicePixelRatio || 1;
    return size * dpr;
}

function setCanvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    height = (canvas.height);
    width = (canvas.width);
}

ctx = setupCanvas(canvas);

var height = getSize(canvas.height);
var width = getSize(canvas.width);
// console.log(height , width);
// ctx.lineWidth = 5;
// ctx.fillRect(0,0,300,200);
// ctx.stroke();
// // console.log(height , width);
let dx = 0;
// noise.seed(0);


// window.addEventListener("mousemove" , (e)=>{    
//     mouseX = e.offsetX;
//     mouseY = e.offsetY;
// })
let circle_size = 0;
let defaultSize = 100;
let current_size = defaultSize;
let targetSize = defaultSize;
function draw(){
    setCanvasSize();
    
    circle_size = Math.sqrt((width * width) + (height * height)) / 2;
    targetSize = ((circle_size - defaultSize) * (loading_percent + 10) / 100) + defaultSize;
    // console.log(targetSize);
    // console.log(height , width);

    let cx = width / 2;
    let mouseX = width / 2 ;
    let cy = height / 2;
    let mouseY = height / 2 ;

    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    // ctx.fillRect(0,0,width , height);
    ctx.clearRect(0,0,width , height);
    ctx.translate(cx,cy);
    // ctx.beginPath();
    // ctx.moveTo(0,0);
    // ctx.lineTo(width , 0);
    // ctx.closePath();
    // ctx.stroke();

    ctx.beginPath();
    var m_noise = noise.perlin3;
    var l_noise = noise.perlin2;


    // var spacing = 25;
    var size = (50 * loading_percent / 100) + 60;
    var scale = (width) / 2 ;
    var radius = 1000;
    
    // let circle_size = 100 + l_noise(dx / scale / 10 , dx / scale / 10) * 200;
    for (let i = 0; i < Math.PI * 2; i+=0.05) {
        let mx = radius * Math.cos(i);
        let my = radius * Math.sin(i);
        let value = m_noise( mx / scale,my / scale , dx / scale) * size ;
        // ctx.lineTo(i * spacing , value);
        let r = current_size + value ;
        // console.log(r);
        
        let x = (r * Math.cos(i)); 
        let y = (r * Math.sin(i));
        ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();

    dx += 20;

    let delta = (targetSize - current_size) / 10;

    if(current_size < targetSize){
        current_size += delta;
    }
}

setInterval(draw, 1000 / 60);

let loadingSpeed = 100;

setInterval(() => {
    if(loading_percent < 100){
        loading_percent+= 1;
    }
    setLoadingText(loading_percent)
}, loadingSpeed);