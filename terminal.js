class Terminal {
    prompt = "root@local$";
    bottom = 0;
    inputText = "";

    constructor(bottom) {
        this.bottom = bottom;
    }

    addKey() {
        this.inputText += key;
    }

    backspace() {
        this.inputText = this.inputText.substring(0, this.inputText.length - 2);
    }

    draw() {
        text(`${this.prompt} ${this.inputText}`, 10, this.bottom - 20);
        this.input += key;
    }
}
