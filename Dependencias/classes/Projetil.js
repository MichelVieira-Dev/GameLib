class Projetil extends GameObject {
    constructor({ x, y, target, ...rest }) {
        super({
            x,
            y,
            spriteName: "pocoes",
            spriteType: "sheet",
            lines: 2,
            cols: 5,
            animations: {
                idle: { frames: [[0, 1]] },
                especial: {
                    ms: 200,
                    frames: [
                        [0, 1],
                        [1, 1],
                        [2, 1],
                        [3, 1],
                        [3, 0],
                    ],
                },
            },
            currentAnimation: "especial",
            nextAnimation: "idle",
        });
        this.target = target;
        this.target.y + this.sprite.frameHeight;
        this.velocity = rest.velocity || 30;
        this.rigidbody = new RigidBody({ gameobject: this });
    }

    update() {
        this.rigidbody.addForce(this.target);
    }
}
