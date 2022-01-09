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
    update() {}
    draw() {
        this.sprite.draw();
    }
}
