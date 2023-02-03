const caretCoolDownDefault = 40;

class Terminal {
    prompt = 'root@local>';
    inputText = '';
    caretCoolDown = caretCoolDownDefault;
    shake = false;

    addKey() {
        this.inputText += key;
    }

    backspace() {
        this.inputText = this.inputText.substring(0, this.inputText.length - 1);
    }

    draw() {
        const x_random = random(-5, 5);
        const y_random = random(-5, 5);
        if (this.shake === true) {
            translate(x_random, y_random);
        }

        stroke(255);
        noFill();
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

        if (this.shake === true) {
            translate(-x_random, -y_random);
        }
    }

    send() {
        this.inputText = '';
    }

    toggleShake() {
        console.log('shake');
        this.shake = !this.shake;
    }
}
