class CharParticle {
    constructor(char, x, y) {
        this.char = '';
        this.posX = 0;
        this.posY = 0;
        this.velocityY = random(-3, -6);
        this.velocityX = random(-10, 10);
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
        else if (this.velocityX < 0) {
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
