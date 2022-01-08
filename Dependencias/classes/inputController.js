class InputController {
    static gameobject;
    constructor(map, gameobject) {
        this.map = map || {};
        this.keysPressed = [];
        InputController.gameobject = gameobject;
        document.addEventListener("keydown", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap && this.keysPressed.indexOf(this.map[e.code]) < 0) {
                this.keysPressed.push(this.map[e.code]);
                InputController.gameobject.InputControllerEvent("keydown", this.keysPressed);
            }
        });
        document.addEventListener("keyup", (e) => {
            let inMap = this.map.hasOwnProperty(e.code) ? true : false;
            if (inMap) {
                InputController.gameobject.InputControllerEvent("keyup", this.keysPressed);
                let index = this.keysPressed.indexOf(this.map[e.code]);
                if (index >= 0) this.keysPressed.splice(index, 1);
            }
        });

        document.addEventListener("click", (event) => {
            // const target = getMousePos(Game.canvas, event);
            // new Projetil({
            //     x: 0,
            //     y: 150,
            //     target,
            //     velocity: 2,
            // });
            InputController.gameobject.InputControllerEvent("click");
        });
    }
}
