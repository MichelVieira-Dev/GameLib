class RigidBody {
    constructor({ gameobject }) {
        this.gameobject = gameobject;
        this.angle = null;
    }

    addForce({ x, y }, stopOnArrival = false) {
        //-------------------------------------------------------------------- //
        //             ______________________________________________________  //
        // Serve para:      targertPosition = x e y do alvo                  | //
        //            |     initialPosition = x e y da posição inicial       | //
        //            |______________________________________________________| //
        //                                                                     //
        // Criada em: 08/01/2022 ----------------------------------------------//
        //-------------------------------------------------------------------- //
        if (this.gameobject.velocity === 0) return;
        if (this.angle == null || stopOnArrival) {
            this.angle = Math.atan2(y - this.gameobject.y, x - this.gameobject.x);
            this.velocity = {
                y: Math.sin(this.angle) * this.gameobject.velocity,
                x: Math.cos(this.angle) * this.gameobject.velocity,
            };
        }
        this.gameobject.x += this.velocity.x;
        this.gameobject.y += this.velocity.y;
    }

    moveTo(target) {
        let dist = getDistance(this.gameobject.x, this.gameobject.y, target.x, target.y);
        if (Math.floor(dist) > 20) {
            this.addForce(target, true);
        }
    }
}
