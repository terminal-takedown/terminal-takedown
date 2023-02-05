const caretCoolDownDefault = 40;
const defaultColor = 'lightgrey';
const defaultSpecialColor = 'green';

const SUCCESS_DELAY = 150;
const ERROR_DELAY = 150;

const SPECIAL_COMMANDS: { [key: string]: string } = {
    'hard mode': 'HARD MODE activated',
    debug: 'DEBUG MODE enabled permanently in this browser',
    exit: 'we need you to defend the system - no running away!',
    whoami: 'master of the universe, defender of the systems, best ethical hacker in town',
};

class Terminal {
    prompt = 'root@local>';
    inputText = '';
    caretCoolDown = caretCoolDownDefault;
    shake = false;
    termHeight: number;
    highlightColor: 'lightgreen' | 'red' | null = null;
    textChangeCallback: (text: string) => void;
    lock = true;
    commandAcceptedFrames: [number, string, string] = [
        0,
        null,
        defaultSpecialColor,
    ];

    constructor(height: number, textChangeCallback: (text: string) => void) {
        this.termHeight = height;
        this.textChangeCallback = textChangeCallback;
    }

    addKey() {
        if (this.lock === false) {
            this.inputText += key;
            this.textChangeCallback(this.inputText);
        }
    }

    backspace() {
        if (this.lock === false) {
            this.inputText = this.inputText.substring(
                0,
                this.inputText.length - 1
            );
            this.textChangeCallback(this.inputText);
        }
    }

    draw() {
        const x_random = random(-5, 5);
        const y_random = random(-5, 5);
        if (this.shake === true) {
            translate(x_random, y_random);
        }

        const [frames, specialCommand, specialColor] =
            this.commandAcceptedFrames;
        if (frames > 0) {
            textSize(24);
            fill(specialColor);
            text('> ' + specialCommand, 30, windowHeight - 100);
            this.commandAcceptedFrames = [
                frames - 1,
                specialCommand,
                specialColor,
            ];
        }

        stroke(this.highlightColor ?? defaultColor);
        noFill();
        rect(20, windowHeight - this.termHeight, windowWidth - 40, 50, 10);

        fill(this.highlightColor ?? defaultColor);
        noStroke();
        textSize(32);

        text(
            `${this.prompt}${this.inputText}${this.addCaret()}`,
            30,
            windowHeight - 45
        );
        --this.caretCoolDown;
        if (this.caretCoolDown < 0) {
            this.caretCoolDown = caretCoolDownDefault;
        }

        if (this.shake === true) {
            translate(-x_random, -y_random);
        }
    }

    private addCaret() {
        if (this.lock === true) return '';
        return this.caretCoolDown < caretCoolDownDefault / 2 ? '_' : '';
    }

    send() {
        const specialText = SPECIAL_COMMANDS[this.inputText];
        if (specialText !== undefined) {
            const color =
                this.inputText === 'exit' ? 'red' : defaultSpecialColor;
            this.commandAcceptedFrames = [50, specialText, color];
        }
        if (this.lock === false) {
            this.inputText = '';
            this.textChangeCallback(this.inputText);
        }
    }

    failedToEnterCommand() {
        this.toggleShake();
        this.highlight('red', ERROR_DELAY, () => this.toggleShake());
        this.inputText = '';
        this.textChangeCallback(this.inputText);
    }
    lockInput() {
        this.lock = true;
    }
    unlockInput() {
        this.lock = false;
    }

    sentWrongCommand() {
        this.highlight('red', ERROR_DELAY);
    }

    success(cb?: () => void) {
        this.highlight('lightgreen', SUCCESS_DELAY);

        setTimeout(() => {
            this.send();
            if (cb) cb();
        }, SUCCESS_DELAY);
    }

    highlight(color: 'lightgreen' | 'red', delay?: number, cb?: () => void) {
        this.highlightColor = color;
        setTimeout(() => {
            this.highlightColor = null;
            if (cb) {
                cb();
            }
        }, delay);
    }

    toggleShake() {
        this.shake = !this.shake;
    }
}
