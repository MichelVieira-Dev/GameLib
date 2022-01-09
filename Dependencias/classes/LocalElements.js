class LocalElements {
    constructor({ gameObject, width, height, color, strokeColor, typeElement }) {
        this.gameObject = gameObject;
        this.width = width;
        this.height = height;
        this.color = color || "#000";
        this.strokeColor = strokeColor || "#fff";
        this.type = typeElement || "rect";

        if (this.type != "rect") {
            this.radius = getRandomArbitrary(2, 4);
        }
    }
    draw() {
        if (this.type == "rect") {
            Game.ctx.fillStyle = this.color;
            Game.ctx.fillRect(this.gameObject.x, this.gameObject.y, this.width, this.height);
        } else if (this.type == "circ") {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.globalAlpha = this.alpha;
            Game.ctx.fillStyle = this.color;
            Game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            Game.ctx.fill();
            Game.ctx.restore();
        } else {
            Game.ctx.save();
            Game.ctx.beginPath();
            Game.ctx.globalAlpha = this.alpha;
            Game.ctx.fillStyle = this.color;
            Game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            Game.ctx.fill();
            Game.ctx.restore();
        }
    }
}
