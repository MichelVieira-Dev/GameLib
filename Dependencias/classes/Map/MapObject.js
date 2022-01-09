class MapObject extends GameObject {
    constructor({ xOnMap = 0, yOnMap = 0, velocity, ...options }) {
        const [x, y] = Map.getPositionCoordinates(xOnMap, yOnMap);
        super({ x, y, rigid: true, velocity, ...options });
        this.xOnMap = xOnMap;
        this.yOnMap = yOnMap;
        this.moveMap = {
            left: { property: "xOnMap", value: -1 },
            right: { property: "xOnMap", value: 1 },
            up: { property: "yOnMap", value: -1 },
            down: { property: "yOnMap", value: 1 },
        };
        this.timeRemainingSpecial = 0;
        this.inMove = false;
    }

    move({ property, value }) {
        let target = {};
        target[property] = this[property] + value;
        console.log(target, [this.xOnMap, this.yOnMap]);
        return false;
        if (property == "xOnMap" && value > 0 && this.sprite.animator.currentAnim != "right") {
            this.sprite.animator.setAnim("right");
        }

        if (property == "xOnMap" && value < 0 && this.sprite.animator.currentAnim != "left") {
            this.sprite.animator.setAnim("left");
        }

        if (property == "yOnMap" && value > 0 && this.sprite.animator.currentAnim != "down") {
            this.sprite.animator.setAnim("down");
        }

        if (property == "yOnMap" && value < 0 && this.sprite.animator.currentAnim != "up") {
            this.sprite.animator.setAnim("up");
        }
        Map.moveTo(this, target);
        // this.rigidbody.addForce(target, true);
    }
}
MapObject.prototype.update = function () {
    if (InputController.keysPressed.length > 0) {
        if (this.moveMap.hasOwnProperty(InputController.keysPressed[0]))
            this.move(this.moveMap[InputController.keysPressed[0]]);
        else this.sprite.animator.setAnim("idle");
    } else {
        this.sprite.animator.setAnim("idle");
    }
    if (this.timeRemainingSpecial > 0 && this.timeRemainingSpecial < new Date().getTime()) {
        this.timeRemainingSpecial = 0;
        this.velocity = this.velocityOriginal;
        this.sprite.animator.setAnim("idle");
    }
};

MapObject.prototype.draw = function () {
    this.sprite.draw();
};
