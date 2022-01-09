class Particles extends GameObject {
    constructor({
        x,
        y,
        width = 4,
        height = 4,
        color = "#000",
        type = "explosion",
        typeElement = "rect",
        strokeColor = ["#000"],
    }) {
        super({
            x,
            y,
            spriteType: "localElements",
            width,
            height,
            color,
            typeElement,
            strokeColor,
        });
        this.destroy = false;
        this.created = true;
        this.alpha = 0.06;
        this.type = type;
        if (type == "explosion") {
            this.alpha = 1;
            this.angle = Math.atan2(Math.random() - 0.5, Math.random() - 0.5);
            this.velocity = {
                y: Math.sin(this.angle) * getRandomArbitrary(0.1, 1),
                x: Math.cos(this.angle) * getRandomArbitrary(0.1, 1),
            };
        } else {
            this.velocity = 0.1;
            this.rigidbody = new RigidBody({ gameobject: this });
        }
    }

    static createExplosion({ x, y, count_particles, colors = ["#000", "#333"] }) {
        for (let i = 0; i < count_particles; i++) {
            let size = getRandomInt(0.2, 4);
            new Particles({
                x,
                y,
                width: size,
                height: size,
                color: colors[getRandomInt(0, colors.length - 1)],
            });
        }
    }

    updateExplosion() {
        if (this.type == "explosion") {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += 0.02;
            this.alpha -= 0.01;
        }
    }
    updateBubbles() {
        if (this.type == "bubbles") {
            if (this.created) {
                this.sprite.radius += 0.01;
                this.alpha += 0.001;
                if (this.alpha > getRandomArbitrary(0.1, 0.4)) {
                    this.created = false;
                }
            } else {
                this.alpha -= 0.001;
            }
            this.rigidbody.addForce({
                y: this.y - getRandomArbitrary(0.1, 0.4),
                x: this.x + getRandomArbitrary(-0.2, 0.2),
            });
        }
    }
}

Particles.prototype.update = function () {
    this.updateExplosion();
    this.updateBubbles();
    if (this.alpha <= 0) {
        this.alpha = 0;
        this.destroy = true;
        return;
    }
};

Particles.prototype.draw = function () {
    Game.ctx.save();
    if (this.sprite.type == "rect") {
        Game.ctx.fillStyle = this.sprite.color;
        Game.ctx.globalAlpha = this.alpha;
        Game.ctx.fillRect(this.x, this.y, this.sprite.width, this.sprite.height);
    } else {
        Game.ctx.beginPath();
        Game.ctx.globalAlpha = this.alpha;
        Game.ctx.fillStyle = this.sprite.color;
        Game.ctx.strokeStyle = this.sprite.strokeColor;
        Game.ctx.arc(this.x, this.y, this.sprite.radius, 0, Math.PI * 2, false);
        Game.ctx.fill();
        Game.ctx.stroke();
    }
    Game.ctx.restore();
};
