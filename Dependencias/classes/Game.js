class Game {
    constructor(canvas) {
        Game.canvas = canvas;
        Game.ctx = Game.canvas.getContext("2d");
        Game.frameController = new FrameController();
        window.gameObjects = [];
    }

    static getAsset(name) {
        return Game.assets.images[name] || null;
    }

    async init(createFunction = async () => {}, ...imgs) {
        Game.assets = new Assets();
        await Game.assets.preload(...imgs);
        await createFunction();
        new InputController({
            KeyW: "up",
            ArrowUp: "up",
            KeyD: "right",
            ArrowRight: "right",
            KeyS: "down",
            ArrowDown: "down",
            KeyA: "left",
            ArrowLeft: "left",
            Space: "space",
        });
        Game.GameLoop();
    }

    static GameLoop() {
        Game.ctx.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        Game.frameController.update();
        Game.ctx.imageSmoothingEnabled = false;
        Game.ctx.imageSmoothingQuality = "high";

        window.gameObjects.map((obj) => {
            obj.update();
        });

        window.gameObjects.map((obj) => {
            obj.draw();
        });

        window.requestAnimationFrame(Game.GameLoop);
    }
}
