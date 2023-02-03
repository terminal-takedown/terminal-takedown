let words: Word[] = []

const pixelSize = window.innerHeight
const terminal = new Terminal(pixelSize)

function setup() {
    textFont('monospace')
    createCanvas(800, pixelSize)
    words.push(new Word('hello', 40, 2))
    words.push(new Word('world', 400, 2))
}

function draw() {
    background(200)

    terminal.draw()
    words.forEach((w) => w.update())
    words.forEach((w) => w.draw())
    words = words.filter((w) => w.posY < pixelSize)

    if (words.length === 0) {
        words.push(new Word('foo', 200, 3))
    }
}

function keyTyped() {
    if (key === 'Enter') {
        terminal.send()
    } else {
        terminal.addKey()
    }
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        terminal.backspace()
    }
}
