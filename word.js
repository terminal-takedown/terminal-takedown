class Word {
    posY = 0;
    speed = 1;

    constructor(text, x, speed) {
        this.posX = x;
        this.text = text;
        this.speed = speed
    }

    update() {
        this.posY += this.speed;
    }

    draw() {
        textSize(32);
        text(this.text, this.posX, this.posY);
    }
}
