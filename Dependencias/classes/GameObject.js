class GameObject {
    constructor({ x, y, rigid, velocity, ...options }) {
        this.x = x;
        this.y = y;
        this.velocity = velocity || 0;
        if (options.spriteType == "localElements") {
            this.sprite = new LocalElements({ gameObject: this, ...options });
        } else this.sprite = new Sprite({ gameObject: this, ...options });

        window.gameObjects.push(this);

        this.idGameObject = window.gameObjects.length - 1;

        this.moveMap = {
            left: { property: "x", value: -100 },
            right: { property: "x", value: 100 },
            up: { property: "y", value: -100 },
            down: { property: "y", value: 100 },
        };

        this.rigidbody = rigid ? new RigidBody({ gameobject: this }) : null;
        // this.timeRemainingSpecial = 0;
        // this.velocityOriginal = 5;
    }
    update() {
        // if (InputController.keysPressed.length > 0) {
        //     if (this.moveMap.hasOwnProperty(InputController.keysPressed[0]))
        //         this.move(this.moveMap[InputController.keysPressed[0]]);
        //     if (
        //         InputController.keysPressed.indexOf("space") > -1 &&
        //         this.timeRemainingSpecial <= 0
        //     ) {
        //         this.especial();
        //     }
        // }
        // if (this.timeRemainingSpecial > 0 && this.timeRemainingSpecial < new Date().getTime()) {
        //     this.timeRemainingSpecial = 0;
        //     this.velocity = this.velocityOriginal;
        //     this.sprite.animator.setAnim("idle");
        // }
    }
    draw() {
        this.sprite.draw();
    }
    // move({ property, value }) {
    //     let target = {};
    //     target[property] = this[property] + value;
    //     this.rigidbody.addForce(target, true);
    // }

    // especial() {
    //     this.timeRemainingSpecial = new Date().getTime() + 1000;
    //     console.log("Especial ....");
    //     this.velocity = this.velocityOriginal * 2;
    //     this.sprite.animator.setAnim("especial");
    // }
}
