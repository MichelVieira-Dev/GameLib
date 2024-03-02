class InputController {
    static keysPressed = [];
    static mousePress = false;
    static clickedObj = {};
    static mousePosition = { x: 0, y: 0 };
    static positionRect = [];
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
            const [x, y] = Map.getInvertedPositionCoordinates(mouse.x, mouse.y);
            console.log(x, y, Math.floor(x), Math.floor(y));
            window.obj.navigator.getPath({ x: Math.floor(x), y: Math.floor(y) });

            InputController.clickedObj = {};
            InputController.mousePress = true;
        });

        // var mouse = { x: 0, y: 0 };
        // var obTeste = new ParticleAnimation({ gameObject: mouse, animationName: "bubble", ms: 20 });

        document.addEventListener("mousemove", (e) => {
            const mouse = getMousePos(Game.canvas, e);
            const [x, y] = Map.getInvertedPositionCoordinates(mouse.x, mouse.y);
            InputController.positionRect = Map.getPositionCoordinates(Math.floor(x), Math.floor(y));
            InputController.mousePosition.x = mouse.x;
            InputController.mousePosition.y = mouse.y;
        });
        document.addEventListener("mouseup", (e) => {
            InputController.mousePress = false;
        });
    }
}
