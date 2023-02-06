import { Image } from 'p5';

let command: Command | null = null;

const GAME_ROUNDS = 10;
let customStart = false;
const MAX_PITY = 3;
let pityEasy = 0;
let pityHard = 0;

let rainActive = false;

const terminal_height = 80;
const terminal_spacing = 20;
const terminal = new Terminal(terminal_height, (text) => {
    if (command) {
        command.setTerminalText(text);
    }
});
let glitch = new Glitch();
const commandHinter = new CommandHints();

const COMMAND_TIMEOUT = 250;

let particles: CharParticle[] = [];
let matrixParticles: MatrixParticle[] = [];
let img: Image | null = null;

function preload() {
    img = loadImage('assets/icon.png');
}

function setup() {
    textFont('monospace');
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    queueNewCommand();
    terminal.lockInput();
    setTimeout(() => {
        gameState = 'initial';
        terminal.unlockInput();
    }, 3000);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if (command) {
        command.resize();
    }
}

let gameState: 'boot' | 'prerun' | 'running' | 'dead' | 'initial' = 'boot';

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
    'backup ~',
    'start {goodName} daemon',
    'unset proxy',
    'bypass proxy',
    'connect to surflan',
];

const goodNames = [
    'firewall',
    'dns',
    'file-watcher',
    'tunnel',
    'vpn',
    'driver',
];
const badNames = [
    'worm.exe',
    'virus.bat',
    'wizard',
    'botnet',
    'miner',
    'brute-force',
    'malware',
    'zip-bomb',
];

function getCommand(): string {
    return random(commands)
        .replaceAll(
            '{randi}',
            Math.floor(random(1, 10 + (score + failCount) * 5)).toString()
        )
        .replaceAll('{badName}', random(badNames))
        .replaceAll('{goodName}', random(goodNames));
}

let failCount = 0;
let score = 0;

function draw() {
    background(20);
    textSize(32);

    matrixParticles.forEach((p) => p.draw());
    matrixParticles.forEach((p) => p.update());
    matrixParticles = matrixParticles.filter((p) => p.chars.length < 25);

    if (gameState === 'boot') {
        const factor = 0.5;
        const y =
            windowHeight / 2 - (windowHeight * factor) / 2 - windowHeight * 0.1;
        image(
            img,
            windowWidth / 2 - (windowHeight * factor) / 2,
            y,
            windowHeight * factor,
            windowHeight * factor
        );
        const name = 'TERMINAL TAKEDOWN';
        textSize(32);
        fill('green');
        text(
            name,
            windowWidth / 2 - textWidth(name) / 2,
            y + windowHeight * factor + 64
        );
    } else if (gameState === 'initial') {
        if (rainActive === true) {
            addMoreRain();
        } else {
            addRandomHintMaybe();
        }
        fill(200);
        textSize(32);
        const messageTop = '[WARN] Your server is under attack!';
        const messageCommand = "[INFO] Type 'ssh server' to start defending";
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

        if (random() > 0.97) {
            matrixParticles.push(
                new MatrixParticle(
                    random(20, windowWidth - 20),
                    random(0, windowHeight - 300),
                    [0, 255, 0]
                )
            );
        }
    } else if (gameState === 'prerun') {
        glitch.drawGlitches();
        if (glitch.glitchFrames === 0) {
            startGame();
        }
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

                if (pityEasy < MAX_PITY && Command.commandSpeed < 1) {
                    Command.decreaseSpeed();
                    ++pityEasy;
                } else if (pityHard < MAX_PITY && Command.commandSpeed < 0.5) {
                    Command.decreaseSpeed();
                    ++pityHard;
                }

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
                    terminal.inputText = MatrixParticle.getRandomString(
                        random(4, 10)
                    );
                    terminal.lockInput();

                    for (
                        let i = 0;
                        i < windowWidth;
                        i += MatrixParticle.size + 5
                    ) {
                        matrixParticles.push(
                            new MatrixParticle(i, 20, [255, 0, 0])
                        );
                    }

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
        if (rainActive === true) {
            addMoreRain();
        } else {
            addRandomHintMaybe();
        }
        textSize(32);
        const messageTop = '[FATAL] Your server has been compromised';
        const messageCommand = "[INFO] Type 'ssh server' to try again";
        const messageScore = `[DEBUG] Defended ${score} attack${
            score === 1 ? '' : 's'
        }`;
        fill(255, 0, 0);
        text(
            messageTop,
            windowWidth / 2 - textWidth(messageTop) / 2,
            windowHeight / 2 - 40
        );
        fill(200);
        text(
            messageCommand,
            windowWidth / 2 - textWidth(messageTop) / 2,
            windowHeight / 2
        );
        text(
            messageScore,
            windowWidth / 2 - textWidth(messageTop) / 2,
            windowHeight / 2 + 40
        );
        if (random() > 0.97) {
            matrixParticles.push(
                new MatrixParticle(
                    random(20, windowWidth - 20),
                    random(0, windowHeight - 300),
                    [255, 0, 0]
                )
            );
        }
    }

    terminal.draw();

    if (localStorage.getItem('debug') == 'true') {
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
}

function keyTyped() {
    if (key === 'Enter') {
        if (
            (gameState === 'initial' || gameState === 'dead') &&
            SPECIAL_COMMANDS.hasOwnProperty(terminal.inputText)
        ) {
            handleSpecialCommand();
        } else if (
            (gameState === 'initial' || gameState === 'dead') &&
            terminal.inputText === 'ssh server'
        ) {
            terminal.success(() => {
                startPreRun();
            });
        } else {
            if (terminal.inputText === command?.text) {
                terminal.success();
                matrixParticles.push(...command.destruct());
                command = null;
                queueNewCommand();
                ++score;
                updateSpeed();
            } else {
                terminal.sentWrongCommand();
            }
        }
    } else {
        terminal.addKey();
    }
}

function startPreRun() {
    terminal.prompt = 'root@server>';
    terminal.inputText = '';
    glitch = new Glitch();
    glitch.addGlitchFrames(15);
    gameState = 'prerun';
}

function startGame() {
    gameState = 'running';
    if (customStart === false) {
        failCount = 0;
        Command.restSpeed();
    }
    score = 0;
    pityEasy = 0;
    pityHard = 0;
    terminal.unlockInput();
    queueNewCommand(0);
    customStart = false;
    matrixParticles = [];
}

function stopGame() {
    gameState = 'dead';
    terminal.prompt = 'root@local>';
    terminal.inputText = '';
    particles = [];
    terminal.unlockInput();
}

function keyPressed() {
    if (keyCode === BACKSPACE) {
        terminal.backspace();
    }

    // debug keys
    if (localStorage.getItem('debug') !== 'true') {
        return;
    }
    if (keyCode === UP_ARROW) {
        command.toggleMoving();
    }
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
    if (keyCode === 171) {
        Command.increaseSpeed();
    }
    if (
        keyCode === ESCAPE &&
        (gameState === 'initial' || gameState === 'dead')
    ) {
        startPreRun();
    }
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

function handleSpecialCommand() {
    const text = terminal.inputText;

    switch (text) {
        case COMMAND_LIST.HARD_MODE:
            Command.commandSpeed = 0.4;
            failCount = 7;
            customStart = true;
            console.log('hard mode activated');
            break;
        case COMMAND_LIST.DEBUG:
            if (
                terminal.inputText === 'debug' &&
                localStorage.getItem('debug') !== 'true'
            ) {
                localStorage.setItem('debug', 'true');
                terminal.success(() => {
                    terminal.inputText = '';
                });
            }
            break;
        case COMMAND_LIST.LET_IT_RAIN:
            letItRain();
            break;
    }

    terminal.sendSpecialCommand(() => {
        terminal.inputText = '';
    });
}

function addRandomHintMaybe() {
    if (
        commandHinter.hintFrames === 0 &&
        random() > 0.9975 &&
        terminal.inputText.length === 0
    ) {
        commandHinter.newHint(150);
    }
    commandHinter.draw();
}

function letItRain() {
    terminal.lockInput();
    rainActive = true;

    setTimeout(() => {
        rainActive = false;
        terminal.unlockInput();
    }, 7500);
}

function addMoreRain() {
    if (frameCount > 25) {
        const rnd = random();
        matrixParticles.push(
            new MatrixParticle(
                random(20, windowWidth - 20),
                random(0, windowHeight - 300),
                rnd < 0.33
                    ? [255, 0, 0]
                    : rnd < 0.66
                    ? [0, 0, 255]
                    : [0, 255, 0]
            )
        );
    }
}
