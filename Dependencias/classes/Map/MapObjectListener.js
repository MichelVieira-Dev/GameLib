class MapObjectListener {
    constructor(targetMapObject) {
        this.target = targetMapObject;
        this.xOnMap = targetMapObject.xOnMap;
        this.yOnMap = targetMapObject.yOnMap;
        this.hadChange = false;

        window.gameObjects.push(this);
    }

    update() {
        if (this.target.xOnMap != this.xOnMap || this.target.yOnMap != this.yOnMap) {
            this.hadChange = true;
        }
        if (this.hadChange) {
            this.xOnMap = this.target.xOnMap;
            this.yOnMap = this.target.yOnMap;
            this.hadChange = false;
            this.hasChanged();
        }
    }

    hasChanged() {
        throw new Error(
            "[" +
                this.constructor.name +
                "] Para utilizar a classe MapObjectListener é necessário implementar uma função hasChanged válida!"
        );
    }

    draw() {}
}
