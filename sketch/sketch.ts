let words: Word[] = [];

const terminal = new Terminal();

function setup() {
    textFont('monospace');
    createCanvas(windowWidth, windowHeight);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
    background(20);
    fill(200);

    terminal.draw();
    words.forEach((w) => w.update());
    words.forEach((w) => w.draw());
    words = words.filter((w) => w.posY < windowHeight);

    if (words.length === 0) {
        words.push(new Word(getCommand(), random(0, windowWidth), 1));
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
