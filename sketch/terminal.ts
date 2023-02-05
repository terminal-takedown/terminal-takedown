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
    lock = true;

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

        stroke(this.highlightColor ?? defaultColor);
        noFill();
        rect(20, windowHeight - this.termHeight, windowWidth - 40, 50, 10);

        fill(this.highlightColor ?? defaultColor);
        noStroke();

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
