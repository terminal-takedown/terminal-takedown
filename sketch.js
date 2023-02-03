let words = [];

const pixelSize = 800;

function setup() {
    createCanvas(800, 800);
    words.push(new Word("hello", 40, 2));
    words.push(new Word("world", 400, 2));
}

function draw() {
    background(255);

    words.forEach((w) => w.update());
    words.forEach((w) => w.draw());
    words = words.filter((w) => w.posY < pixelSize);

    if (words.length === 0) {
        words.push(new Word("foo", 200, 3));
    }
}
