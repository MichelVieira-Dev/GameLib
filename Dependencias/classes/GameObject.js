class GameObject {
    constructor({ x, y, rigid, velocity, ...options }) {
        this.x = x;
        this.y = y;
        this.velocity = velocity || 0;
        if (options.spriteType == "localElements") {
            this.sprite = new LocalElements({ gameObject: this, ...options });
        } else this.sprite = new Sprite({ gameObject: this, ...options });
        this.rigidbody = rigid ? new RigidBody({ gameobject: this }) : null;
        this.velocityOriginal = this.velocity;
        window.gameObjects.push(this);
    }

    rectsColliding(r1, r2) {
        return !(
            r1.x > r2.x + r2.w ||
            r1.x + r1.w < r2.x ||
            r1.y > r2.y + r2.h ||
            r1.y + r1.h < r2.y
        );
    }
    mouseColliding(obj, mouse) {
        if (
            mouse.x > obj.x &&
            mouse.x <= obj.x + obj.sprite.frameWidth &&
            mouse.y > obj.y &&
            mouse.y <= obj.y + obj.sprite.frameHeight
        ) {
            return true;
        }
        return false;
    }

    update() {}
    draw() {
        this.sprite.draw();
    }
}
