class Hero extends RPGPerson {
    constructor({ name, xOnMap = 0, yOnMap = 0, velocity = 2, atributtes, ...options }) {
        super({ name, xOnMap, yOnMap, velocity, atributtes, ...options });
        this.name = name;
    }
}
Hero.prototype.stopMove = function () {
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
    if (
        InputController.keysPressed.length <= 0 ||
        (InputController.keysPressed.length > 0 &&
            !this.moveMap.hasOwnProperty(InputController.keysPressed[0]))
    ) {
        this.sprite.animator.setAnim("idle");
    }
};
Hero.prototype.update = function () {
    if (this.onClickMe()) {
        console.log(this.name, this.atributtes);
    }
    if (InputController.keysPressed.length > 0) {
        if (this.moveMap.hasOwnProperty(InputController.keysPressed[0]))
            this.move(this.moveMap[InputController.keysPressed[0]]);
    } else {
        if (this.targetMove == null && !this.inMove && this.sprite.animator.currentAnim != "idle") {
            this.sprite.animator.setAnim("idle");
        }
    }
    this.childUpdate();
};
