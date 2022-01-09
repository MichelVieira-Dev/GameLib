class Sprite {
    constructor({ spriteName, gameObject, spriteType, lines, cols, ...animations }) {
        this.gameObject = gameObject;
        this.name = spriteName;
        this.img = Game.getAsset(spriteName);
        this.type = spriteType || "single";
        if (spriteType == "sheet") {
            this.slice({ lines, cols });
            this.animator = new SpriteAnimator({ ...animations });
        } else {
            this.frameWidth = this.img.width;
            this.frameHeight = this.img.height;
        }
    }

    slice({ lines, cols }) {
        //-------------------------------------------------------------------- //
        //             ______________________________________________________  //
        // Serve para: Corta a spritesheet no total de linhas e colunas      | //
        //            | que foi informado                                    | //
        //            |______________________________________________________| //
        //                                                                     //
        // Criada em: 08/01/2022 ----------------------------------------------//
        //-------------------------------------------------------------------- //

        this.lines = lines;
        this.cols = cols;
        this.frameWidth = this.img.width / this.cols;
        this.frameHeight = this.img.height / this.lines;
    }

    draw() {
        const [x, y] = this.type == "sheet" ? this.animator.getCurrentFrame() : [0, 0];
        let mx = this.gameObject.x// - this.frameWidth / 2;
        let my = this.gameObject.y// - this.frameHeight / 2;
        if (window["debug_collider"] == true) {
            Game.ctx.strokeStyle = "#f00";
            Game.ctx.strokeRect(mx, my, this.frameWidth, this.frameHeight);
        }
        Game.ctx.drawImage(
            this.img,
            x * this.frameWidth,
            y * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            mx,
            my,
            this.frameWidth, // width no canvas
            this.frameHeight // width no canvas
        );
    }
}
