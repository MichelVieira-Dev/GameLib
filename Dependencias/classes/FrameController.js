class FrameController {
    constructor() {
        this.lastCalledTime = Date.now();
        this.fps = 0;
        this.contador = 0;
        this.containerFPS = document.createElement("div");
        this.containerFPS.style.userSelect = "none";
        document.body.append(this.containerFPS);
        this.containerFPS.style.position = "absolute";
        this.containerFPS.style.top = "0";
        this.containerFPS.style.right = "20px";
        this.containerFPS.style.color = "#fff";
    }
    draw() {
        // FPS
        if (this.contador % 50 == 0) {
            this.containerFPS.innerHTML = "FP/s " + this.fps;
        }
    }
    update() {
        this.draw();
        this.contador++;
        let delta = (Date.now() - this.lastCalledTime) / 1000;
        this.lastCalledTime = Date.now();
        this.fps = Math.round(1 / delta);
    }
}
