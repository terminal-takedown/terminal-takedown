const defaultSpeed = 1.5;

class Command {
    static commandSpeed = defaultSpeed;
    posY = 0;
    posX = 0;
    text = '';
    terminalText = '';
    stopMoving = false;

    constructor(text: string, x: number, terminalText: string) {
        this.posX = x;
        this.text = text;
        this.terminalText = terminalText;
    }

    update() {
        if (this.stopMoving === false) {
            this.posY += windowHeight / (Command.commandSpeed * 500);
        }
    }

    findFirstErrorIndex() {
        let firstErrorIndex = -1;

        for (
            let i = 0;
            i < this.text.length && i < this.terminalText.length;
            i++
        ) {
            if (this.text[i] !== this.terminalText[i]) {
                firstErrorIndex = i;
                break;
            }
        }

        return firstErrorIndex;
    }

    splitText(): [string, string, string] {
        if (this.terminalText.length === 0) {
            return ['', '', this.text];
        }

        if (!this.text.startsWith(this.terminalText)) {
            const firstErrorIndex = this.findFirstErrorIndex();

            const firstRedCharacter =
                firstErrorIndex === -1
                    ? this.terminalText.length - 1
                    : firstErrorIndex;
            const extraCharAmount =
                this.terminalText.length -
                this.text.substring(0, firstRedCharacter).length;

            return [
                this.text.substring(0, firstRedCharacter),

                this.text
                    .substring(firstRedCharacter, this.terminalText.length)
                    .padEnd(extraCharAmount, '_'),

                this.text.substring(this.terminalText.length, this.text.length),
            ];
        }

        return [
            this.terminalText,
            '',
            this.text.replace(this.terminalText, ''),
        ];
    }

    public draw() {
        textSize(32);
        fill(200);
        noStroke();

        const [typedText, errorText, untypedText] = this.splitText();

        fill(0, 255, 0);
        text(typedText, this.posX, this.posY);
        fill(255, 0, 0);
        text(
            Array.from(errorText)
                .map((c) => (c === ' ' ? '_' : c))
                .join(''),

            this.posX + textWidth(typedText),
            this.posY
        );
        fill(200);
        text(
            untypedText,
            this.posX + textWidth(typedText) + textWidth(errorText),
            this.posY
        );
    }

    destruct(): MatrixParticle[] {
        textSize(32);
        const particles: MatrixParticle[] = [];
        for (
            let i = 0;
            i < textWidth(this.text);
            i += MatrixParticle.size + 5
        ) {
            particles.push(
                new MatrixParticle(this.posX + i, this.posY, [0, 255, 0])
            );
        }
        return particles;
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

    static increaseSpeed() {
        Command.commandSpeed -= Command.commandSpeed * 0.1;
        console.log('new speed', Command.commandSpeed);
    }

    static decreaseSpeed() {
        Command.commandSpeed += Command.commandSpeed * 0.1;
        console.log('new speed', Command.commandSpeed);
    }

    static restSpeed() {
        Command.commandSpeed = defaultSpeed;
    }
    toggleMoving() {
        this.stopMoving = !this.stopMoving;
    }
}
