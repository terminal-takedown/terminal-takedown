let command: Command | null = null;

const GAME_ROUNDS = 10;

const terminal_height = 80;
const terminal_spacing = 20;
const terminal = new Terminal(terminal_height, (text) => {
    if (command) {
        command.setTerminalText(text);
    }
});
let glitch = new Glitch();

const COMMAND_TIMEOUT = 250;

let particles: CharParticle[] = [];

function setup() {
    textFont('monospace');
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    queueNewCommand();
    terminal.unlockInput();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (command) {
        command.resize();
    }
}

let gameState: 'running' | 'dead' | 'initial' = 'initial';

const commands = [
    'kill --pid {randi}',
    'close port {randi}',
    'start --id {randi}',
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

const goodNames = ['firewall', 'dns', 'file-watcher', 'tunnel', 'vpn'];
const badNames = [
    'worm.exe',
    'virus.bat',
    'wizard',
    'botnet',
    'miner',
    'brute-force',
    'malware',
];

function getCommand(): string {
    return random(commands)
        .replaceAll(
            '{randi}',
            Math.floor(random(0, 10 + (score + failCount) * 5)).toString()
        )
        .replaceAll('{badName}', random(badNames))
        .replaceAll('{goodName}', random(goodNames));
}

let failCount = 0;
let score = 0;

function draw() {
    background(20);
    textSize(32);

    if (gameState === 'initial') {
        fill(200);
        const messageTop = '[WARN] Your server is under attack!';
        const messageCommand = "[INFO] type 'ssh server' to start defending";
        text(
            messageTop,
            windowWidth / 2 - textWidth(messageCommand) / 2,
            windowHeight / 2 - 40
        );
        text(
            messageCommand,
            windowWidth / 2 - textWidth(messageCommand) / 2,
            windowHeight / 2
        );
    } else if (gameState === 'running') {
        glitch.drawGlitches();

        if (command !== null) {
            command.update();
            command.draw();

            if (
                command.posY >
                windowHeight - terminal_height - terminal_spacing
            ) {
                failCount++;

                glitch.addGlitchFrames(15);
                glitch.addPermanentGlitch();
                const failedText = terminal.inputText;
                textSize(32);

                for (let i = 0; i < failedText.length; i++) {
                    const particle = new CharParticle(
                        failedText[i],
                        textWidth(terminal.prompt) +
                            30 +
                            textWidth('a') * i +
                            10,
                        windowHeight - 60
                    );
                    particles.push(particle);
                }

                terminal.failedToEnterCommand();

                command = null;
                if (failCount >= GAME_ROUNDS) {
                    terminal.inputText = 'exit';
                    terminal.lockInput();

                    setTimeout(() => {
                        terminal.success(() => {
                            stopGame();
                        });
                    }, 600);
                } else {
                    queueNewCommand();
                    updateSpeed();
                }
            }
        }

        particles.forEach((p) => p.draw());
        particles.forEach((p) => p.update());
        particles = particles.filter((p) => p.posY <= windowHeight);
    } else if (gameState === 'dead') {
        fill(200);
        textSize(32);
        const messageTop = '[FTL] Your server has been compromised';
        const messageCommand = "[INFO] type 'ssh server' to try again";
        const messageScore = `[DEBUG] Defended ${score} attack${
            score === 1 ? '' : 's'
        }`;
        text(
            messageTop,
            windowWidth / 2 - textWidth(messageCommand) / 2,
            windowHeight / 2 - 40
        );
        text(
            messageCommand,
            windowWidth / 2 - textWidth(messageCommand) / 2,
            windowHeight / 2
        );
        text(
            messageScore,
            windowWidth / 2 - textWidth(messageCommand) / 2,
            windowHeight / 2 + 40
        );
    }

    terminal.draw();

    textSize(20);
    fill('green');
    text(
        Math.round(frameRate()).toString(),
        innerWidth - 25,
        innerHeight - 20,
        50,
        50
    );
}

function keyTyped() {
    if (key === 'Enter') {
        if (
            (gameState === 'initial' || gameState === 'dead') &&
            terminal.inputText === 'ssh server'
        ) {
            terminal.success(() => {
                startGame();
            });
        } else {
            if (terminal.inputText === command?.text) {
                terminal.success();
                command = null;
                queueNewCommand();
                updateSpeed();
                ++score;
            } else {
                terminal.sentWrongCommand();
            }
        }
    } else {
        terminal.addKey();
    }
}

function startGame() {
    glitch = new Glitch();
    gameState = 'running';
    terminal.prompt = 'root@server>';
    terminal.inputText = '';
    failCount = 0;
    score = 0;
    Command.restSpeed();
    terminal.unlockInput();
    queueNewCommand(0);
}

function stopGame() {
    gameState = 'dead';
    terminal.prompt = 'root@local>';
    terminal.inputText = '';
    particles = [];
    terminal.unlockInput();
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
        Command.increaseSpeed();
    }
    if (
        keyCode === ESCAPE &&
        (gameState === 'initial' || gameState === 'dead')
    ) {
        startGame();
    }
}

function touchStarted() {
    document.getElementById('hidden-input').focus();
}

function updateSpeed() {
    if ((score + failCount) % 3 == 0) {
        Command.increaseSpeed();
    }
}

function queueNewCommand(specialTimeout: number | undefined = undefined) {
    setTimeout(
        () => {
            textSize(32);
            const commandText = getCommand();
            command = new Command(
                commandText,
                Math.floor(
                    random(20, windowWidth - textWidth(commandText) - 100)
                ),
                terminal.inputText
            );
            console.log(command.text);
        },
        specialTimeout !== undefined ? specialTimeout : COMMAND_TIMEOUT
    );
}
