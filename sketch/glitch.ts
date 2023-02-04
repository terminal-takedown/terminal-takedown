const colors = [
    '#b4b2b5',
    '#dfd73f',
    '#6ed2dc',
    '#66cf5d',
    '#c542cb',
    '#d0535e',
    '#3733c9',
];
let linePos = 0,
    rAF;

class Glitch {
    draw = () => {
        //rAF = window.requestAnimationFrame(this.draw);

        fill('#1a191c');
        rect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < 200; i++) {
            if (i % 2) continue;
            fill(`rgba(255, 255, 255, ${Math.random() * 0.01})`);
            rect(
                Math.floor(Math.random() * innerWidth),
                Math.floor(Math.random() * innerHeight),
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 30) + 1
            );

            fill(`rgba(0,0,0,${Math.random() * 0.1})`);
            rect(
                Math.floor(Math.random() * innerWidth),
                Math.floor(Math.random() * innerHeight),
                Math.floor(Math.random() * 25) + 1,
                Math.floor(Math.random() * 25) + 1
            );
        }
        this.drawGlitchLine();
        //ctx.setTransform(1, 0, 0, .8, .2, 0);
    };

    drawGlitchLine = () => {
        const myrand = Math.floor(Math.random() * 7);
        const randomColor = colors[myrand];
        //console.log(myrand, randomColor);

        fill(randomColor);

        rect(
            Math.random() * innerWidth,
            Math.random() * innerHeight,
            Math.random() * 100,
            Math.random() * 5
        );
    };
}
