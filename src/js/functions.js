module.exports = {
    clearCanvas() {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color.value;
    },

    saveCanvas() { localStorage.setItem("canvas", JSON.stringify(coords)); },

    replayCanvas() {
        clearCanvas();

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
}