let words: Word[] = [];

const pixelSize = window.innerHeight;
const terminal = new Terminal(pixelSize);

function setup() {
    textFont('monospace');
    createCanvas(window.innerWidth, pixelSize);
}

const commands = [
    'kill --pid {randi}',
    'close port {randi}',
    'start process --id {randi}',
    'update firewall',
    'close connection {randi} --force',
];

function getCommand() {
    return random(commands).replace(
        '{randi}',
        Math.floor(random(0, 999)).toString()
    );
}

function draw() {
    background(255);

    terminal.draw();
    words.forEach((w) => w.update());
    words.forEach((w) => w.draw());
    words = words.filter((w) => w.posY < pixelSize);

    if (words.length === 0) {
        words.push(new Word(getCommand(), random(0, pixelSize), 2));
    }
}

function keyTyped() {
    if (key === 'Enter') {
        console.log(
            `${terminal.inputText}`,
            `${words.map((w) => w.text).join(' ')}`
        );
        if (terminal.inputText === words.map((w) => w.text).join(' ')) {
            words = [];
        }
        terminal.send();
    } else {
        terminal.addKey();
    }
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        terminal.backspace();
    }
}
