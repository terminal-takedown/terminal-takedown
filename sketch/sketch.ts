let command: Command | null = null;

const terminal_height = 80;
const terminal_spacing = 20;
const terminal = new Terminal(terminal_height, (text) => {
    if (command) {
        command.setTerminalText(text);
    }
});

const COMMAND_TIMEOUT = 250;

function setup() {
    textFont('monospace');
    createCanvas(windowWidth, windowHeight);
    queueNewCommand();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (command) {
        command.resize();
    }
}

const commands = [
    'kill --pid {randi}',
    'close port {randi}',
    'start process --id {randi}',
    'update {goodName}',
    'close connection {randi}',
    'stop download --force',
    'install {goodName}',
    'kill {badName} -f',
    'close {badName}',
    'start {goodName}',
    'rm -f {badName}',
    'block {badName} -g',
    'allow {goodName}',
    'download more-ram',
];

const goodNames = ['firewall', 'dns'];
const badNames = ['worm.exe', 'virus.bat', 'wizard'];

function getCommand(): string {
    return random(commands)
        .replaceAll('{randi}', Math.floor(random(0, 999)).toString())
        .replaceAll('{badName}', random(badNames))
        .replaceAll('{goodName}', random(goodNames));
}

function draw() {
    background(20);

    terminal.draw();
    if (command !== null) {
        command.update();
        command.draw();

        if (command.posY > windowHeight - terminal_height - terminal_spacing) {
            terminal.failedToEnterCommand();
            command = null;
            queueNewCommand();
        }
    }
}

function keyTyped() {
    if (key === 'Enter') {
        console.log(`${terminal.inputText}`, `${command.text}`);
        if (terminal.inputText === command.text) {
            terminal.success();
            command = null;
            queueNewCommand();
        } else {
            terminal.sentWrongCommand();
        }
    } else {
        terminal.addKey();
    }
}

function keyPressed() {
    if (keyCode === DOWN_ARROW) {
        terminal.toggleShake();
    }
    if (keyCode === RIGHT_ARROW) {
        terminal.success();
    }
    if (keyCode === LEFT_ARROW) {
        terminal.sentWrongCommand();
        setTimeout(() => {
            terminal.toggleShake();
        }, 100);
    }
    if (keyCode === BACKSPACE) {
        terminal.backspace();
    }
    if (keyCode === 171) {
        command.increaseSpeed();
    }
}

function queueNewCommand() {
    setTimeout(() => {
        const commandText = getCommand();
        command = new Command(
            commandText,
            Math.floor(random(20, windowWidth - textWidth(commandText) - 100)),
            1,
            terminal.inputText
        );
        console.log(command.text);
    }, COMMAND_TIMEOUT);
}
