const caretCoolDownDefault = 40;

class Terminal {
    prompt = "root@local>";
    bottom = 0;
    inputText = "";
    caretCoolDown = caretCoolDownDefault;

    constructor(bottom) {
        this.bottom = bottom;
    }

    addKey() {
        this.inputText += key;
    }

    backspace() {
        this.inputText = this.inputText.substring(0, this.inputText.length - 1);
    }

    draw() {
        text(
            `${this.prompt}${this.inputText}${
                this.caretCoolDown < caretCoolDownDefault / 2 ? "_" : ""
            }`,
            10,
            this.bottom - 20
        );
        --this.caretCoolDown;
        if (this.caretCoolDown < 0) {
            this.caretCoolDown = caretCoolDownDefault;
        }
    }

    send() {
        this.inputText = "";
    }
}
