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

        //remove do array os objetos que devem ser destruidos
        window.gameObjects = window.gameObjects.filter((obj) => {
            return !obj.destroy;
        });

        Game.ctx.save();
        Game.ctx.translate(window.worldmap.img.width, window.worldmap.img.height);
        window.gameObjects.map((obj) => {
            Game.ctx.globalAlpha = 1;
            obj.update();
            obj.draw();
        });
        Game.ctx.restore();

        // window.gameObjects.map((obj) => {
        //     obj.draw();
        // });

        window.requestAnimationFrame(Game.GameLoop);
    }
}
