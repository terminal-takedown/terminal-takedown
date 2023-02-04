class Command {
    posY = 0;
    speed = 1;
    posX = 0;
    text = '';

    constructor(text: any, x: any, speed: any) {
        this.posX = x;
        this.text = text;
        this.speed = speed;
    }

    update() {
        this.posY += windowHeight / (this.speed * 500);
    }

    public draw() {
        textSize(32);
        fill(200);
        noStroke();
        text(this.text, this.posX, this.posY);
    }
}
