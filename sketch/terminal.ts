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
        stroke(255);
        fill(20);
        rect(20, windowHeight - 80, windowWidth - 50, 50, 10);

        fill(200);
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
    }

    send() {
        this.inputText = '';
    }
}
