class CharParticle {
    char = '';
    posX = 0;
    posY = 0;
    velocityY = random(-3, -6);
    velocityX = random(-10, 10);

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
        } else if (this.velocityX < 0) {
            this.velocityX += 1;
        }
    }

    draw() {
        textSize(32);
        fill('red');
        noStroke();
        text(this.char, this.posX, this.posY);
    }
}
