const katakana =
    '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cyrillic = 'БГДЁЖЗИЙЛПУФЦЧШЩЪЫЭЮЯ';
const numbers = '0123456789';
const other = ':・."=*+-<>';
const alphabet = (katakana + latin + numbers + cyrillic).split('');

class MatrixParticle {
    static size = 20;
    posX = 0;
    posY = 0;
    chars: string[] = [];
    updateCount = 0;
    opacity = 255;
    speed = 5;
    rgb = [0, 255, 0];

    constructor(x: number, y: number, rgb: [number, number, number]) {
        this.posX = x;
        this.posY = y + random(-20, 20);
        this.chars.push(random(alphabet));
        this.speed = Math.floor(random(3, 7));
        this.rgb = rgb;
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
            fill(this.rgb[0], this.rgb[1], this.rgb[2], this.opacity - i * 7);
            text(this.chars[i], this.posX, this.posY - MatrixParticle.size * i);
        }
    }

    static getRandomString(length: number): string {
        let rndstr = '';
        for (let item = 0; item < length; item++) {
            rndstr += random(alphabet);
        }
        return rndstr;
    }
}
