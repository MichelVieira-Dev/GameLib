class GameObject {
    constructor({ x,y,row, col, rigid, velocity, ...options }) {
        if(row != undefined)
            [x,y]=Map.getPositionCoordinates(row,col);
        this.x = x;
        this.y = y;
        this.velocity = velocity || 0;
        if (options.spriteType == "localElements") {
            this.sprite = new LocalElements({ gameObject: this, ...options });
        } else this.sprite = new Sprite({ gameObject: this, ...options });

        window.gameObjects.push(this);

        this.moveMap = {
            left: { property: "x", value: -100 },
            right: { property: "x", value: 100 },
            up: { property: "y", value: -100 },
            down: { property: "y", value: 100 },
        };

        this.rigidbody = rigid ? new RigidBody({ gameobject: this }) : null;
        this.timeRemainingSpecial = 0;
        this.velocityOriginal = this.velocity;
    }
    update() {
        if (this.sprite.type != "sheet") {
            return;
        }
        if (InputController.keysPressed.length > 0) {
            if (this.moveMap.hasOwnProperty(InputController.keysPressed[0]))
                this.move(this.moveMap[InputController.keysPressed[0]]);
            else
                this.sprite.animator.setAnim("idle");
            if (
                InputController.keysPressed.indexOf("space") > -1 &&
                this.timeRemainingSpecial <= 0
            ) {
                this.especial();
            }
        }else{
            this.sprite.animator.setAnim("idle");
        }
        if (this.timeRemainingSpecial > 0 && this.timeRemainingSpecial < new Date().getTime()) {
            this.timeRemainingSpecial = 0;
            this.velocity = this.velocityOriginal;
            this.sprite.animator.setAnim("idle");
        }
    }
    draw() {
        this.sprite.draw();
    }
    move({ property, value }) {
        let target = {};
        target[property] = this[property] + value;

        if(property == "x" && value >0 && this.sprite.animator.currentAnim  != "right"){
            this.sprite.animator.setAnim('right');
        }
        
        if(property == "x" && value < 0 && this.sprite.animator.currentAnim  != "left"){
            this.sprite.animator.setAnim('left');
        }

        if(property == "y" && value >0 && this.sprite.animator.currentAnim  != "down"){
            this.sprite.animator.setAnim('down');
        }
        
        if(property == "y" && value < 0 && this.sprite.animator.currentAnim  != "up"){
            this.sprite.animator.setAnim('up');
        }

        this.rigidbody.addForce(target, true);
    }

    especial() {
        this.timeRemainingSpecial = new Date().getTime() + 1000;
        console.log("Especial ....");
        this.velocity = this.velocityOriginal * 2;
        this.sprite.animator.setAnim("especial");
    }
}
