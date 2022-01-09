class Map extends GameObject {
    constructor({ spriteName, widthTile = 16, heightTile = 16 }) {
        super({ row: 0, col: 0, spriteName, spriteType: "sprite" });
        this.img = Game.getAsset(spriteName);
        this.tileWidth=widthTile;
        this.tileHeight=heightTile;
    }
    static getPositionCoordinates(row,col){
        return [row*map.tileWidth,col*map.tileHeight];
    }

    static moveTo(gameobject,rowDest,colDest){
        const [x,y] = Map.getPositionCoordinates(rowDest,colDest);
        if(gameobject.x != x || gameobject.y != y){
            gameobject.rigidbody.addForce({x,y,stopOnArrival:true});
        }else{gameobject.inMove=false;}
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
