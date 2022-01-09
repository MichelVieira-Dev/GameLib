class ParticleAnimation {
    constructor({ gameObject, animationName, ms }) {
        this.gameObject = gameObject;
        this.animationName = animationName;
        this.ms = ms || 220;
        this.lastGenerate = 0;
    }

    bubbleAnimation() {
        let now = new Date().getTime();
        if (now > this.lastGenerate) {
            this.lastGenerate = now + this.ms;
            let colors = ["green", "green"];
            let strokeColors = ["#333", "#666"];
            let myColor = getRandomInt(0, colors.length - 1);
            let size = getRandomInt(2, 4);
            new Particles({
                x: getRandomInt(this.gameObject.x - 10, this.gameObject.x + 10),
                y: getRandomInt(this.gameObject.y - 5, this.gameObject.y + 30),
                width: size,
                height: size,
                color: colors[myColor],
                strokeColor: strokeColors[myColor],
                type: "bubbles",
                typeElement: "circ-stroke",
            });
        }
    }

    update({ x, y }) {
        this.gameObject.x = x;
        this.gameObject.y = y;
        this.bubbleAnimation();
    }
}
