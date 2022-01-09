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
            const target = getMousePos(Game.canvas, e);
            InputController.mousePress = true;
            Particles.createBubbles({
                x: target.x,
                y: target.y,
                count_particles: 100,
                colors: ["#7da37d", "#7da37dd9", "#4191417d"],
                strokeColors: ["#7da37dd9", "#7da37d", "#7da37dd9"],
            });
            // const target = getMousePos(Game.canvas, event);
            // new Projetil({
            //     x: 0,
            //     y: 150,
            //     target,
            //     velocity: 2,
            // });
        });

        document.addEventListener("mouseup", (e) => {
            InputController.mousePress = false;

            // const target = getMousePos(Game.canvas, event);
            // new Projetil({
            //     x: 0,
            //     y: 150,
            //     target,
            //     velocity: 2,
            // });
        });
    }
}
