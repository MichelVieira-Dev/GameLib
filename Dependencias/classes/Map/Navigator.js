class Navigator {
    constructor({ gameobject, limitLoop = 1000 }) {
        this.gameobject = gameobject;
        this.openL = {};
        this.closeL = {};
        this.current = {};
        this.limitLoop = limitLoop;
        this.path = [];
    }

    getParents() {
        const parents = [
            { x: -1, y: 0 }, // a esquerda
            { x: 1, y: 0 }, // a direita
            { x: 0, y: -1 }, // acima
            { x: 0, y: 1 }, // abaixo
        ];

        var retorno = [];
        for (let i = 0; i < parents.length; i++) {
            const y = this.current.y + parents[i].y;
            const x = this.current.x + parents[i].x;
            let thisParent = Map.getTileIsWalked(x, y);
            if (thisParent)
                retorno.push({
                    x,
                    y,
                    parent: this.current,
                    distance: Math.abs(getDistance(this.end.x, this.end.y, x, y)),
                });
        }
        return retorno;
    }

    getPath(end) {
        if (!Map.getTileIsWalked(end.x, end.y)) return [];

        this.openL = [
            {
                x: this.gameobject.xOnMap,
                y: this.gameobject.yOnMap,
                distance: 0,
            },
        ];
        this.current = this.openL[0];
        this.closeL = {};
        this.end = end;
        var limit = 0;
        while (
            limit < this.limitLoop &&
            this.openL.length > 0 &&
            (this.current.x != this.end.x || this.current.y != this.end.y)
        ) {
            this.openL.sort((a, b) => {
                return a.distance - b.distance;
            });

            //pega o primeiro elemento da lista aberta e remove ele da lista
            this.current = this.openL.shift();
            if (Object.keys(this.closeL).includes(this.current.x + "," + this.current.y)) {
                continue;
            }
            //pego todos os vizinhos e adiciono na lista aberta
            const parents = this.getParents(this.current);

            // console.log(parents);
            // return false;
            parents.forEach((el) => {
                if (!Object.keys(this.closeL).includes(el.x + "," + el.y)) {
                    this.openL.push(el);
                }
            });

            //adiciono o nó atual na lista fechada
            this.closeL[this.current.x + "," + this.current.y] = this.current;

            // console.log(current);

            limit += 1;
        }
        if (limit >= this.limitLoop) {
            return [];
        } else if (this.current.x == this.end.x && this.current.y == this.end.y) {
            this.#createPath();
        }
        return [];
    }

    #createPath() {
        let path = [];
        while (
            this.current.x !== this.gameobject.xOnMap ||
            this.current.y !== this.gameobject.yOnMap
        ) {
            path.unshift(this.current);
            if (this.current.parent == null) {
                break;
            }
            this.current = this.current.parent;
        }
        return path;
    }
}
