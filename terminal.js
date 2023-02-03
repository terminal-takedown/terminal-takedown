class Terminal {
    prompt = "root@local>";
    bottom = 0;
    inputText = "";

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
        text(`${this.prompt}${this.inputText}_`, 10, this.bottom - 20);
        this.input += key;
    }

    send() {
        this.inputText = "";
    }
}
