const hints = [
    "did you ever try 'hard mode', did you?",
    "enter 'debug' mode",
    "you cannot 'shutdown' the system",
    "type 'reboot' and you will be fame",
    "who am i? enter 'whoami'",
    "if you've got enough just 'exit' the game",
    'PLEASE READ THE [INFO] !!!',
];

class CommandHints {
    hintFrames = 0;
    current: { hint: string; height: number; length: number } = null;

    draw() {
        if (this.hintFrames > 0 && this.current !== null) {
            fill('green');
            textSize(24);
            text(
                `> ${this.current.hint.substring(
                    0,
                    this.current.hint.length + 1 - this.current.length
                )}`,
                30,
                this.current.height
            );
            this.current.length -= 1;
            this.hintFrames--;
        }
    }

    newHint(i: number) {
        this.hintFrames = i;
        const rnd = Math.round(random(0, hints.length - 1));
        this.current = {
            hint: hints[rnd],
            height: random(windowHeight * 0.075, windowHeight * 0.2),
            length: hints[rnd].length,
        };
    }
}
