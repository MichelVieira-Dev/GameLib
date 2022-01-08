class Assets {
    constructor() {
        this.images = {};
    }
    async #LoadImages({ src, name }) {
        return new Promise((resolve) => {
            let image = new Image();
            image.src = src;
            image.onload = async () => {
                resolve({ name, src: image });
            };
        });
    }

    async preload(...imgs) {
        return new Promise(async (resolve) => {
            let allImgsPromises = [];
            for (let i = 0; i < imgs.length; i++) {
                allImgsPromises.push(this.#LoadImages(imgs[i]));
            }
            Promise.all(allImgsPromises).then(async (res) => {
                for (let i = 0; i < res.length; i++) {
                    this.images[res[i]["name"]] = res[i]["src"];
                }
                resolve(res);
            });
        });
    }
}
