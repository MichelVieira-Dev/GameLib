class Map extends GameObject {
    constructor({ spriteName, widthTile, heightTile }) {
        super({ x: 0, y: 0, spriteName, spriteType: "sprite" });
        this.img = Game.getAsset(spriteName);
        console.log(this.sprite);
    }
}

Map.prototype.update = function () {};

Map.prototype.draw = function () {
    const mx = map.xInit * map.tileWidth;
    const my = map.yInit * map.tileHeight;

    if (window["debug_collider"] == true) {
        Game.ctx.strokeStyle = "#f00";
        Game.ctx.strokeRect(mx, my, this.sprite.frameWidth, this.sprite.frameHeight);
    }
    Game.ctx.strokeRect(0, 0, 16, 16);
    Game.ctx.drawImage(
        this.img,
        0,
        0,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        mx,
        my,
        this.sprite.frameWidth, // width no canvas
        this.sprite.frameHeight // width no canvas
    );

    Game.ctx.restore();
};
