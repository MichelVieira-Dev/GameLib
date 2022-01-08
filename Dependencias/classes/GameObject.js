class GameObject {
    constructor({ x, y, vx, vy, ...options }) {
        this.x = x;
        this.y = y;
        this.sprite = new Sprite({ gameObject: this, ...options });
        window.gameObjects.push(this);
    }
    update() {}
    InputControllerEvent(eventName, e) {
        switch (eventName) {
            case "click":
                console.log(eventName);
                break;
            case "keydown":
                console.log(eventName, e);
                break;
            case "keyup":
                break;
            default:
                break;
        }
    }
}
