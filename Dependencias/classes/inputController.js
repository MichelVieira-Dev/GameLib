class InputController {
    constructor(map) {
        this.map = map || {};
        this.keysPressed = [];
        document.addEventListener("keydown", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap && this.keysPressed.indexOf(this.map[e.code]) < 0) {
                this.keysPressed.push(this.map[e.code]);
            }
        });
        document.addEventListener("keyup", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap) {
                let index = this.keysPressed.indexOf(this.map[e.code]);
                if (index >= 0) this.keysPressed.splice(index, 1);
            }
        });

        document.addEventListener("click", (event) => {
            const target = getMousePos(Game.canvas, event);
            new Projetil({
                x: 0,
                y: 150,
                target,
                velocity: 2,
            });
        });
    }
}
