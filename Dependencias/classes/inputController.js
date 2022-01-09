class InputController {
    static keysPressed = [];
    static mousePress = false;
    constructor(map) {
        this.map = map || {};

        document.addEventListener("keydown", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap && InputController.keysPressed.indexOf(this.map[e.code]) < 0) {
                InputController.keysPressed.push(this.map[e.code]);
            }
        });
        document.addEventListener("keyup", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap) {
                let index = InputController.keysPressed.indexOf(this.map[e.code]);
                if (index >= 0) InputController.keysPressed.splice(index, 1);
            }
        });

        document.addEventListener("mousedown", (e) => {
            const mouse = getMousePos(Game.canvas, e);
            console.log(mouse)
            InputController.mousePress = true;
            Particles.createExplosion({ x: mouse.x, y: mouse.y, count_particles: 100 });
        });

        var mouse = { x: 0, y: 0 };
        var obTeste = new ParticleAnimation({ gameObject: mouse, animationName: "bubble", ms: 20 });

        document.addEventListener("mousemove", (e) => {
            mouse = getMousePos(Game.canvas, e);
            InputController.mousePress = true;
            obTeste.update(mouse);
        });
        document.addEventListener("mouseup", (e) => {
            InputController.mousePress = false;
        });
    }
}
