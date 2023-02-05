const katakana =
    '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const other = ':・."=*+-<>';
const alphabet = (katakana + latin + nums).split('');

class MatrixParticle {
    static size = 20;
    posX = 0;
    posY = 0;
    chars: string[] = [];
    updateCount = 0;
    opacity = 255;
    speed = 5;

    constructor(x: number, y: number) {
        this.posX = x;
        this.posY = y + random(-20, 20);
        this.chars.push(random(alphabet));
        this.speed = Math.floor(random(3, 7));
    }

    update() {
        ++this.updateCount;
        if (this.updateCount % this.speed === 0) {
            this.posY += MatrixParticle.size;
            this.chars = [random(alphabet), ...this.chars];

            this.chars = this.chars.map((c) => {
                if (random() > 0.95) {
                    return random(alphabet);
                }
                return c;
            });

            this.opacity -= 10;
        }
    }

    draw() {
        textSize(MatrixParticle.size);
        fill(255, 255, 255, this.opacity);
        noStroke();
        text(this.chars[0], this.posX, this.posY);
        for (let i = 1; i < this.chars.length; i++) {
            fill(0, 200 - i * 10, 0, this.opacity);
            text(this.chars[i], this.posX, this.posY - MatrixParticle.size * i);
        }
    }
}
