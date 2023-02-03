var words = [];
var pixelSize = 800;
var terminal = new Terminal(pixelSize);
function setup() {
    console.log("setup");
    createCanvas(800, 800);
    words.push(new Word("hello", 40, 2));
    words.push(new Word("world", 400, 2));
}
function draw() {
    console.log("draw");
    background(255);
    terminal.draw();
    words.forEach(function (w) { return w.update(); });
    words.forEach(function (w) { return w.draw(); });
    words = words.filter(function (w) { return w.posY < pixelSize; });
    if (words.length === 0) {
        words.push(new Word("foo", 200, 3));
    }
}
function keyTyped() {
    terminal.addKey();
}
function keyPressed() {
    if (key === "Backspace") {
        terminal.backspace();
    }
}
var Terminal = (function () {
    function Terminal(bottom) {
        this.prompt = "root@local$";
        this.bottom = 0;
        this.inputText = "";
        this.input = "";
        this.bottom = bottom;
    }
    Terminal.prototype.addKey = function () {
        this.inputText += key;
    };
    Terminal.prototype.backspace = function () {
        this.inputText = this.inputText.substring(0, this.inputText.length - 2);
    };
    Terminal.prototype.draw = function () {
        text(this.prompt + " " + this.inputText, 10, this.bottom - 20);
        this.input += key;
    };
    return Terminal;
}());
var Word = (function () {
    function Word(text, x, speed) {
        this.posY = 0;
        this.speed = 1;
        this.posX = 0;
        this.text = "";
        this.posX = x;
        this.text = text;
        this.speed = speed;
    }
    Word.prototype.update = function () {
        this.posY += this.speed;
    };
    Word.prototype.draw = function () {
        textSize(32);
        text(this.text, this.posX, this.posY);
    };
    return Word;
}());
//# sourceMappingURL=build.js.map