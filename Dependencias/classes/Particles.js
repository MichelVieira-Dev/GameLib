class Particles extends GameObject {
    constructor({
        x,
        y,
        width = 4,
        height = 4,
        color = "#000",
        type = "explosion",
        typeElement = "rect",
        strokeColor,
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

        this.typeElement = typeElement;
        this.created = true;
        this.alpha = 0.06;
        if (type == "explosion") {
            this.angle = Math.atan2(Math.random() - 0.5, Math.random() - 0.5);
            this.alpha = 1;
            this.velocity = {
                y: Math.sin(this.angle) * getRandomArbitrary(0.5, 2.5),
                x: Math.cos(this.angle) * getRandomArbitrary(0.5, 2.5),
            };
        } else {
            this.velocity = 0.5;
            this.rigidbody = new RigidBody({ gameobject: this });
        }
    }

    static createExplosion({ x, y, count_particles, colors = ["#000", "#333"] }) {
        for (let i = 0; i < count_particles; i++) {
            let size = getRandomInt(1, 4);
            new Particles({
                x,
                y,
                width: size,
                height: size,
                color: colors[getRandomInt(0, colors.length - 1)],
            });
        }
    }

    static createBubbles({
        x,
        y,
        count_particles,
        colors = ["#222", "#333"],
        strokeColors = ["#333", "#666"],
    }) {
        for (let i = 0; i < count_particles; i++) {
            let size = getRandomInt(1, 4);
            let myColor = getRandomInt(0, colors.length - 1);
            new Particles({
                x: getRandomInt(x - 10, x + 10),
                y: getRandomInt(y - 20, y + 15),
                width: size,
                height: size,
                color: colors[myColor],
                strokeColor: strokeColors[myColor],
                type: "bubbles",
                typeElement: "circ-stroke",
            });
        }
    }
}
Particles.prototype.update = function () {
    if (this.type == "explosion") {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    } else {
        if (this.created) {
            this.alpha += 0.001;
            if (this.alpha > getRandomArbitrary(0.1, 0.4)) {
                this.created = false;
            }
        } else {
            this.alpha -= 0.0001;
        }
        this.rigidbody.addForce({
            y: this.y - getRandomArbitrary(0.1, 0.4),
            x: this.x + getRandomArbitrary(-0.1, 0.1),
        });
    }
    if (this.alpha <= 0) {
        delete window.gameObjects[this.idGameObject];
        this.alpha = 0;
        return;
    }
};

Particles.prototype.draw = function () {
    Game.ctx.save();
    if (this.typeElement == "rect") {
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
