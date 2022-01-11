class RPGPerson extends MapObject {
    constructor({ name, xOnMap = 0, yOnMap = 0, velocity = 2, behaviors, atributtes, ...options }) {
        super({ xOnMap, yOnMap, velocity, ...options });
        this.name = name;
        this.atributtes = atributtes || {
            health: 100,
            damage: 20,
            xpByDeath: 10,
        };
    }

    onClickMe() {
        if (
            this.mouseColliding(this, InputController.mousePosition) &&
            InputController.mousePress &&
            !InputController.clickedObj.hasOwnProperty(this.name)
        ) {
            InputController.clickedObj[this.name] = true;
            return true;
        }
        return false;
    }

    setDamage(target) {
        target.atributtes.health -= this.atributtes.damage;
    }
}
