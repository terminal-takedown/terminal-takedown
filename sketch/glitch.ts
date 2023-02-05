const colors = [
    '#b4b2b5',
    '#dfd73f',
    '#6ed2dc',
    '#66cf5d',
    '#c542cb',
    '#d0535e',
    '#3733c9',
];

type PermanentGlitch = {
    color: string;
    x: number;
    y: number;
    w: number;
    h: number;
};

let linePos = 0,
    rAF;

class Glitch {
    permanentGlitches: PermanentGlitch[] = [];
    glitchFrames = 0;
    drawGlitches = () => {
        //rAF = window.requestAnimationFrame(this.draw);
        if (this.glitchFrames > 0) {
            this.enterGlitchMode();
            this.glitchFrames -= 1;
        }
        this.drawPermanentGlitches();

        //ctx.setTransform(1, 0, 0, .8, .2, 0);
    };

    addGlitchFrames = (frames: number) => {
        this.glitchFrames += frames;
    };

    drawGlitchLine = () => {
        for (let i = 0; i < 6; i++) {
            const myrand = Math.floor(Math.random() * 7);
            const randomColor = colors[myrand];

            fill(randomColor);
            rect(
                Math.random() * innerWidth,
                Math.random() * innerHeight,
                Math.random() * 100,
                Math.random() * 5
            );
        }
    };
    drawPermanentGlitches = () => {
        this.permanentGlitches.forEach((element) => {
            const offset = random(-1, 1);
            fill(element.color);

            let randomStart = 0;
            const move = Math.random() > 0.92;
            if (move) {
                translate(offset, offset);
                randomStart = random(-5, 5);
                fill(random(colors));
            }

            rect(
                element.x + randomStart,
                element.y,
                element.w + randomStart,
                element.h
            );
            if (random(0, 1) > 0.95) {
                fill(20);
                rect(
                    element.x + random(-element.w / 2, element.w / 2),
                    element.y,
                    random(20, 60),
                    element.h
                );
            }
            if (move) {
                translate(-offset, -offset);
            }
        });
    };

    addPermanentGlitch = () => {
        for (let i = 0; i < random(2, 5); i++) {
            const fett = Math.random();
            const gray = Math.random() > 0.4;
            this.permanentGlitches.push({
                color: gray
                    ? `rgba(255,255,255,${random(0.4, 1)})`
                    : colors[Math.floor(Math.random() * 7)],
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight - 80 - 20,
                w: Math.random() * 80 + 10,
                h: fett < 0.75 ? Math.random() * 3 : Math.random() * 5,
            });
        }
    };

    enterGlitchMode = () => {
        fill('#1a191c');
        rect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < 350; i++) {
            fill(`rgba(255, 255, 255, ${Math.random() * 0.01})`);
            rect(
                Math.floor(Math.random() * innerWidth),
                Math.floor(Math.random() * innerHeight),
                Math.floor(Math.random() * 50) + 1,
                Math.floor(Math.random() * 50) + 1
            );

            fill(`rgba(0,0,0,${Math.random() * 0.1})`);
            rect(
                Math.floor(Math.random() * innerWidth),
                Math.floor(Math.random() * innerHeight),
                Math.floor(Math.random() * 50) + 1,
                Math.floor(Math.random() * 50) + 1
            );
        }
        this.drawGlitchLine();
    };
}
