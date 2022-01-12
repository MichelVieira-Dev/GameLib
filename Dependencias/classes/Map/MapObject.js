class MapObject extends GameObject {
    constructor({ xOnMap = 0, yOnMap = 0, velocity = 1, ...options }) {
        const [x, y] = Map.getPositionCoordinates(xOnMap, yOnMap);
        super({ x, y, rigid: true, velocity, ...options });
        this.xOnMap = xOnMap;
        this.yOnMap = yOnMap;

        Map.addWall(this);

        this.moveMap = {
            left: { property: "xOnMap", value: -1, direction: "left" },
            right: { property: "xOnMap", value: 1, direction: "right" },
            up: { property: "yOnMap", value: -1, direction: "up" },
            down: { property: "yOnMap", value: 1, direction: "down" },
        };
        this.timeRemainingSpecial = 0;
        this.inMove = false;
        this.targetMove = null;
        this.targetDirection = null;
    }

    stopMove() {
        const { yOnMap = this.yOnMap, xOnMap = this.xOnMap } = this.targetMove;
        const [x, y] = Map.getPositionCoordinates(xOnMap, yOnMap);
        this.x = x;
        this.y = y;

        //remove o colisor do mapa
        Map.removeWall(this.xOnMap, this.yOnMap, this.name);

        this.yOnMap = yOnMap;
        this.xOnMap = xOnMap;

        //adiciono o novo colisor
        Map.addWall(this);

        this.inMove = false;
        this.targetMove = null;
        this.targetDirection = null;

        this.sprite.animator.setAnim("idle");
    }

    move({ property, value, direction }) {
        if (this.inMove) return;
        let target = {};
        target[property] = this[property] + value;
        const { yOnMap = this.yOnMap, xOnMap = this.xOnMap } = target;
        if (!Map.getTileIsWalked(xOnMap, yOnMap)) {
            return;
        }
        this.targetMove = target;

        this.targetDirection = direction;
        this.inMove = true;
        if (direction == "right" && this.sprite.animator.currentAnim != "right") {
            this.sprite.animator.setAnim("right");
        }

        if (direction == "left" && this.sprite.animator.currentAnim != "left") {
            this.sprite.animator.setAnim("left");
        }

        if (direction == "down" && this.sprite.animator.currentAnim != "down") {
            this.sprite.animator.setAnim("down");
        }

        if (direction == "up" && this.sprite.animator.currentAnim != "up") {
            this.sprite.animator.setAnim("up");
        }
    }
}
MapObject.prototype.update = function () {
    if (this.inMove && this.targetMove != null) {
        const { yOnMap = this.yOnMap, xOnMap = this.xOnMap } = this.targetMove;
        const [x, y] = Map.getPositionCoordinates(xOnMap, yOnMap);
        this.rigidbody.moveTo({ x, y }, true, []);
    }
};

MapObject.prototype.draw = function () {
    this.sprite.draw();
};
