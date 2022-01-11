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

        window.gameObjects.map((obj) => {
            obj.update();
        });

        window.gameObjects
            .sort((a, b) => {
                return b.y - a.y;
            })
            .map((obj) => {
                Game.ctx.save();
                Game.ctx.translate(
                    -window.obj.x + Game.canvas.width / 2,
                    -window.obj.y + Game.canvas.height / 2
                );
                Game.ctx.globalAlpha = 1;
                Game.ctx.strokeStyle = "orange";
                Game.ctx.strokeRect(
                    InputController.positionRect[0],
                    InputController.positionRect[1],
                    window.worldmap.tileWidth,
                    window.worldmap.tileHeight
                );
                obj.draw();
                Game.ctx.restore();
            });

        // Game.ctx.fillRect(InputController.mousePosition.x, InputController.mousePosition.y, 50, 50);
        window.requestAnimationFrame(Game.GameLoop);
    }
}
