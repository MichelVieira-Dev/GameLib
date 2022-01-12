class Enemy extends RPGPerson {
    constructor({ name, xOnMap = 0, yOnMap = 0, velocity = 2, behaviors, atributtes, ...options }) {
        super({ name, xOnMap, yOnMap, velocity, behaviors, atributtes, ...options });
        this.behaviors = behaviors || {
            surveillance: {},
            onFight: {},
            afraid: {},
        };
        this.currentBehavior = "surveillance";
    }
}

Enemy.prototype.update = function () {
    if (this.onClickMe()) {
        console.log(this.name, this.atributtes);
    }
    this.childUpdate();
};
