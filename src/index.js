const funcs = require("./js/functions");

const panel = document.getElementById("panel");
const color = document.querySelector(".color");
const range = document.querySelector(".range");

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - panel.clientHeight;
const ctx = canvas.getContext("2d")

const coords = [];

let onMouseDown = false;

if (localStorage.getItem("canvas")) {
    JSON.parse(localStorage.getItem("canvas"));
}

canvas.addEventListener("mousedown", () => onMouseDown = true);
canvas.addEventListener("mouseup", () => {
    onMouseDown = false
    ctx.beginPath();
    coords.push("");
});

canvas.addEventListener("mousemove", (e) => {
    ctx.strokeStyle = color.value;
    ctx.fillStyle = color.value;
    ctx.lineWidth = range.value * 2;
    if (onMouseDown) {
        coords.push([e.clientX, e.clientY - panel.offsetHeight]);
        ctx.lineTo(e.clientX, e.clientY - panel.offsetHeight);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY - panel.offsetHeight, range.value, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY - panel.offsetHeight);
    }
})

window.addEventListener("keydown", (e) => {
    if (e.code == "KeyN") {
        clearCanvas();
        console.log("cleared");
    } else if (e.code == "KeyS") {
        saveCanvas();
        console.log("saved");
    } else if (e.code == "KeyR") {
        replayCanvas()
    }
})

function clearCanvas() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color.value;
}

function saveCanvas() { localStorage.setItem("canvas", JSON.stringify(coords)); }

function replayCanvas() {
    clearCanvas();
    coords = JSON.parse(localStorage.getItem("coords"));
    let interval = setInterval(() => {
        if (!coords.length) {
            clearInterval(interval);
            ctx.beginPath();
            return;
        }

        let crd = coords.shift();
        let e = {
            clientX: crd[0],
            clientY: crd[1],
        }
        ctx.lineTo(e.clientX, e.clientY - panel.offsetHeight);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY - panel.offsetHeight, range.value, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY - panel.offsetHeight);
    }, 20)
}