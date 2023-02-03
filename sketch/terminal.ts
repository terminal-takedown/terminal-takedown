const caretCoolDownDefault = 40;

class Terminal {
    prompt = 'root@local>';
    inputText = '';
    caretCoolDown = caretCoolDownDefault;

    addKey() {
        this.inputText += key;
    }

    backspace() {
        this.inputText = this.inputText.substring(0, this.inputText.length - 1);
    }

    draw() {
        text(
            `${this.prompt}${this.inputText}${
                this.caretCoolDown < caretCoolDownDefault / 2 ? '_' : ''
            }`,
            10,
            windowHeight - 20
        );
        --this.caretCoolDown;
        if (this.caretCoolDown < 0) {
            this.caretCoolDown = caretCoolDownDefault;
        }
    }

    send() {
        this.inputText = '';
    }
}
