class SpriteAnimator {
    constructor({ currentAnimation, ...animations }) {
        this.animations = animations.animations;
        this.currentAnim = currentAnimation || "idle";
        this.currentAnimPosition = 0;
        this.reamainingTime = new Date().getTime();
        this.nextAnimationOnFinish = animations.nextAnimation || null;
    }
    getCurrentFrame() {
        if (this.animations[this.currentAnim].frames.length > 1) this.refreshAnim();
        return this.animations[this.currentAnim].frames[this.currentAnimPosition];
    }

    refreshAnim() {
        let now = new Date().getTime();
        if (now - this.reamainingTime >= this.animations[this.currentAnim].ms) {
            this.reamainingTime = now;
            this.currentAnimPosition++;
        }
        if (this.currentAnimPosition >= this.animations[this.currentAnim].frames.length) {
            if (this.nextAnimationOnFinish != null) {
                this.setAnim(this.nextAnimationOnFinish);
                this.nextAnimationOnFinish = null;
                return;
            }
            this.currentAnimPosition = 0;
        }
    }
    setAnim(name, nextOnFinish = null) {
        if (this.animations.hasOwnProperty(name)) {
            this.currentAnim = name;
            this.reamainingTime = new Date().getTime();
            this.currentAnimPosition = 0;
            if (nextOnFinish != null) this.nextAnimationOnFinish = nextOnFinish;
        } else {
            console.error("Animação não existe!");
        }
    }
}
