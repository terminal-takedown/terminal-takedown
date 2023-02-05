const katakana = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cyrillic = 'БГДЁЖЗИЙЛПУФЦЧШЩЪЫЭЮЯ';
const numbers = '0123456789';
const other = ':・."=*+-<>';
const alphabet = (katakana + latin + numbers + cyrillic).split('');
class MatrixParticle {
    constructor(x, y, rgb) {
        this.posX = 0;
        this.posY = 0;
        this.chars = [];
        this.updateCount = 0;
        this.opacity = 255;
        this.speed = 5;
        this.rgb = [0, 255, 0];
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
}
MatrixParticle.size = 20;
