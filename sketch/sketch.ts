let command: Command | null = null;

const terminal_height = 80;
const terminal_spacing = 20;
const terminal = new Terminal(terminal_height);

const COMMAND_TIMEOUT = 250;

function setup() {
    textFont('monospace');
    createCanvas(windowWidth, windowHeight);
    queueNewCommand();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

const commands = [
    'kill --pid {randi}',
    'close port {randi}',
    'start process --id {randi}',
    'update firewall',
    'close connection {randi}',
    'stop download --force',
];

function getCommand() {
    return random(commands).replace(
        '{randi}',
        Math.floor(random(0, 999)).toString()
    );
}

function draw() {
    background(20);

    terminal.draw();
    if (command !== null) {
        command.update();
        command.draw();
        console.log(command.posY);
        if (command.posY > windowHeight - terminal_height - terminal_spacing) {
            terminal.toggleShake();
            command = null;
            //queueNewCommand();
        }
    }
}

function keyTyped() {
    if (key === 'Enter') {
        console.log(`${terminal.inputText}`, `${command.text}`);
        if (terminal.inputText === command.text) {
            command = null;
        }
        terminal.send();
    } else {
        terminal.addKey();
    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        terminal.toggleShake();
    }
    if (keyCode === BACKSPACE) {
        terminal.backspace();
    }
}

function queueNewCommand() {
    setTimeout(() => {
        command = new Command(getCommand(), random(0, windowWidth), 0.5);
    }, COMMAND_TIMEOUT);
}
