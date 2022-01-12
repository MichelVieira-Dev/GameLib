class Map extends MapObject {
    static wall = {};
    constructor({ spriteName, widthTile = 16, heightTile = 16 }) {
        super({ row: 0, col: 0, spriteName, spriteType: "sprite" });
        this.name = "worldmap";
        this.img = Game.getAsset(spriteName);
        this.tileWidth = widthTile;
        this.tileHeight = heightTile;
    }

    static addWall(gameobject) {
        if (!Map.wall.hasOwnProperty(gameobject.xOnMap + "," + gameobject.yOnMap)) {
            Map.wall[gameobject.xOnMap + "," + gameobject.yOnMap] = [];
        }
        Map.wall[gameobject.xOnMap + "," + gameobject.yOnMap].push(gameobject);
    }

    static removeWall(xOnMap, yOnMap, name) {
        if (Map.wall.hasOwnProperty(xOnMap + "," + yOnMap)) {
            for (let i = 0; i < Map.wall[xOnMap + "," + yOnMap].length; i++) {
                if (Map.wall[xOnMap + "," + yOnMap][i]["name"] == name) {
                    Map.wall[xOnMap + "," + yOnMap].splice(i, 1);
                    if (Map.wall[xOnMap + "," + yOnMap].length <= 0)
                        delete Map.wall[xOnMap + "," + yOnMap];
                    break;
                }
            }
        }
    }

    static getPositionCoordinates(xOnMap, yOnMap) {
        return [xOnMap * map.tileWidth, yOnMap * map.tileHeight];
    }

    static getInvertedPositionCoordinates(xOnMap, yOnMap) {
        return [xOnMap / map.tileWidth, yOnMap / map.tileHeight];
    }

    static getTileIsWalked(xOnMap, yOnMap) {
        let isWalked = map["chucks"].hasOwnProperty(xOnMap + "," + yOnMap)
            ? map["chucks"][xOnMap + "," + yOnMap]
            : { colider: false };
        if (typeof isWalked != "object") {
            return isWalked;
        }
        if (isWalked["colider"] == true) return !isWalked["colider"];

        //checkColision on static objects
        if (Map.wall.hasOwnProperty(xOnMap + "," + yOnMap)) {
            let obj = {};
            obj["rigidbody"] = { isCollider: false };
            for (let i = 0; i < Map.wall[xOnMap + "," + yOnMap].length; i++) {
                obj = Map.wall[xOnMap + "," + yOnMap][i];
                if (obj.rigidbody.isCollider == true) break;
            }
            return !obj.rigidbody.isCollider;
        }
        return true;
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
