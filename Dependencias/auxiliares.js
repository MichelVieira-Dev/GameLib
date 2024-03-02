function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX + (window.obj.x - Game.canvas.width/2), // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY + (window.obj.y - Game.canvas.height/2), // been adjusted to be relative to element
    };
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * Loads assets asynchronously and returns a Promise that resolves when all assets are loaded.
 * @param {Object} assets - An object containing key-value pairs where keys are asset names and values are asset paths.
 * @param {Function} mediaClass - The class constructor for the type of media (e.g., Image or Audio).
 * @returns {Promise} A Promise that resolves when all assets are loaded successfully, or rejects with an error.
 */
const loadAssets = (assets = {}, mediaClass) => {
    // Validate mediaClass parameter
    if (![Image, Audio].includes(mediaClass)) {
        return Promise.reject(`${mediaClass} is not a valid media type.`);
    }
    //Variables for tracking loaded assets
    const totalAssets = Object.keys(assets).length;
    let loadedAssets = 0;

    // If there are no assets, resolve immediately
    if (loadedAssets == totalAssets) {
        return Promise.resolve();
    }

    // Create a Promise to handle asset loading
    return new Promise((resolve, reject) => {
        // Iterate through assets
        for (const [key, value] of Object.entries(assets)) {
            // Create a new instance of the mediaClass
            const asset = assets[key] = new mediaClass();
            // Set the source of the asset
            asset.src = value;

            // Event listener for successful asset loading
            asset.addEventListener('load', () => {
                loadedAssets++;
                // If all assets are loaded, resolve the Promise
                if (loadedAssets === totalAssets) {
                    resolve();
                }
            });

            // Event listener for asset loading errors
            asset.addEventListener('error', (error) => {
                reject(`Error loading asset: ${key} > ${value}`, error);
            });
        }
    });
}