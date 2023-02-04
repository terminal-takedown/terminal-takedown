let commandSpeed = 1;

class Command {
    posY = 0;
    posX = 0;
    text = '';
    terminalText = '';

    constructor(text: string, x: number, speed: number, terminalText: string) {
        this.posX = x;
        this.text = text;
        this.terminalText = terminalText;
    }

    update() {
        this.posY += windowHeight / (commandSpeed * 500);
    }

    splitText(): [typedText: string, untypedText: string] {
        if (this.terminalText.length === 0) {
            return ['', this.text];
        }

        if (!this.text.startsWith(this.terminalText)) {
            return ['', this.text];
        }

        return [this.terminalText, this.text.replace(this.terminalText, '')];
    }

    public draw() {
        textSize(32);
        fill(200);
        noStroke();

        const [typedText, untypedText] = this.splitText();

        fill(0, 255, 0);
        text(typedText, this.posX, this.posY);
        fill(200);
        text(untypedText, this.posX + textWidth(typedText), this.posY);
    }

    resize() {
        textSize(32);
        if (this.posX > windowWidth - textWidth(this.text)) {
            this.posX = windowWidth - textWidth(this.text) - 10;
        }
    }

    setTerminalText(text: string) {
        this.terminalText = text;
    }

    increaseSpeed() {
        commandSpeed -= 0.1;
    }
}
