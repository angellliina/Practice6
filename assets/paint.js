const canvas = document.getElementById('drawingZone');
const context = canvas.getContext("2d");
const rect = canvas.getBoundingClientRect();

let points = [];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// drawing 
let paint = false;

const addPoint = (x, y, dragging) => {
    points.push({
        x: (x - rect.left),
        y: (y - rect.top),
        dragging: dragging
    })
}

const startPos = (e) => {
    paint = true;
    addPoint(e.pageX, e.pageY);
    redraw();
    draw(e);
}

const endPos = () => {
    paint = false;
    context.beginPath();
}

const draw = (e) => {

    if(!paint) return;

    context.lineCap = "round";

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
    addPoint(e.pageX, e.pageY, true);
}

canvas.addEventListener('mousedown', startPos);
canvas.addEventListener('mouseup', endPos);
canvas.addEventListener('mousemove', draw);

// clear layout
const clearBtn = document.querySelector('.clearBtn');

clearBtn.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});


// color picker
const colorPicker = document.querySelector('.colorpicker');

colorPicker.addEventListener('change', () => {
    context.strokeStyle = colorPicker.value;
});

// size changing
const sizeForm = document.querySelector('.size');

sizeForm.addEventListener('change', () => {
    context.lineWidth = sizeForm.value;
})

const showTimeBtn = document.querySelector('.timeBtn');

showTimeBtn.addEventListener('click', () => {
    context.fillStyle = "Red";
    context.font = "bold 16px Arial";
    context.fillText(new Date().toDateString(), canvas.width - 200, canvas.height - 30)
})

// download
const downloadBtn = document.querySelector('.downloadBtn');

downloadBtn.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
    const newTab = window.open('about:blank','image from canvas');
    newTab.document.write("<img src='" + dataUrl + "' alt='from canvas'/>");
});

const imgBtn = document.querySelector('.imgBtn');

imgBtn.addEventListener('click', () => {
    const img = new Image; 
    img.src =`https://www.fillmurray.com/200/300`;   
    context.drawImage(img, 150, 300);
})

const redraw = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
 
    context.strokeStyle = options.strokeColor;
    context.lineJoin = "round";
    context.lineWidth = options.strokeWidth;

    let prevPoint = null;
    for (let point of points){
        context.beginPath();
        if (point.dragging && prevPoint){
            context.moveTo(prevPoint.x, prevPoint.y)
        } else {
            context.moveTo(point.x - 1, point.y);
        }
        context.lineTo(point.x, point.y)
        context.closePath()
        context.stroke();
        prevPoint = point;
    }

 }

 const saveBtn = document.querySelector('.saveBtn');

    saveBtn.addEventListener('click', () => {
        console.log(points)
    })
 