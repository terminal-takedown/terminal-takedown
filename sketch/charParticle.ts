class CharParticle {
    char = '';
    posX = 0;
    posY = 0;
    velocityY = -5;
    velocityX = random(0, 20);

    constructor(char: string, x: number, y: number) {
        this.char = char;
        this.posX = x;
        this.posY = y;
    }

    update() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;

        this.velocityY += 1;

        if (this.velocityX > 0) {
            this.velocityX -= 1;
        }
    }

    draw() {
        textSize(32);
        fill(200);
        noStroke();
        text(this.char, this.posX, this.posY);
    }
}
