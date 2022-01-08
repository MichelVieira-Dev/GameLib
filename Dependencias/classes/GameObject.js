class GameObject {
    constructor({ x, y, vx, vy, ...options }) {
        this.x = x;
        this.y = y;
        this.sprite = new Sprite({ gameObject: this, ...options });
        window.gameObjects.push(this);
    }
    update() {}
}
