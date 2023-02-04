const caretCoolDownDefault = 40;
const defaultColor = 'grey';

const SUCCESS_DELAY = 150;
const ERROR_DELAY = 150;

class Terminal {
    prompt = 'root@local>';
    inputText = '';
    caretCoolDown = caretCoolDownDefault;
    shake = false;
    termHeight: number;
    highlightColor: 'lightgreen' | 'red' | null = null;
    textChangeCallback: (text: string) => void;

    constructor(height: number, textChangeCallback: (text: string) => void) {
        this.termHeight = height;
        this.textChangeCallback = textChangeCallback;
    }

    addKey() {
        this.inputText += key;
        this.textChangeCallback(this.inputText);
    }

    backspace() {
        this.inputText = this.inputText.substring(0, this.inputText.length - 1);
        this.textChangeCallback(this.inputText);
    }

    draw() {
        const x_random = random(-5, 5);
        const y_random = random(-5, 5);
        if (this.shake === true) {
            translate(x_random, y_random);
        }

        stroke(this.highlightColor ?? defaultColor);
        noFill();
        rect(20, windowHeight - this.termHeight, windowWidth - 50, 50, 10);

        fill(this.highlightColor ?? defaultColor);
        noStroke();

        text(
            `${this.prompt}${this.inputText}${
                this.caretCoolDown < caretCoolDownDefault / 2 ? '_' : ''
            }`,
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

    send() {
        this.inputText = '';
        this.textChangeCallback(this.inputText);
    }

    failedToEnterCommand() {
        this.toggleShake();
        this.highlight('red', ERROR_DELAY, () => this.toggleShake());
        this.inputText = '';
        this.textChangeCallback(this.inputText);
    }

    sentWrongCommand() {
        this.highlight('red', ERROR_DELAY);
    }

    success() {
        this.highlight('lightgreen', SUCCESS_DELAY);

        setTimeout(() => {
            terminal.send();
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
