var Sounds;
(function (Sounds) {
    Sounds["MENU"] = "menu";
    Sounds["GAME"] = "game";
    Sounds["POSITIVE"] = "positive";
    Sounds["NEGATIVE"] = "negative";
    Sounds["GAME_OVER"] = "lost";
    Sounds["TYPE"] = "singleType";
    Sounds["GAME_START"] = "start";
    Sounds["SPECIAL_TYPE"] = "click";
})(Sounds || (Sounds = {}));
const SOUND_LIST = {};
class Sound {
    static draw() {
        textSize(16);
        fill('white');
        noStroke();
        const soundText = Sound.sound_active === true ? 'click to mute' : 'click to unmute';
        text(soundText, windowWidth - textWidth(soundText) - 30, 30);
    }
    static playOnce(sound) {
        if (Sound.sound_active === true) {
            console.log('play sound', sound, SOUND_LIST[sound]);
            SOUND_LIST[sound].play();
        }
    }
    static play(sound) {
        if (Sound.sound_active === true && !SOUND_LIST[sound].isPlaying()) {
            console.log('play menu');
            if (SOUND_LIST[sound].isLoaded()) {
                SOUND_LIST[sound].play();
            }
            if (sound === 'menu' || sound === 'game') {
                if (this.current_bg_sound !== null) {
                    this.current_bg_sound.stop();
                }
                this.current_bg_sound = SOUND_LIST[sound];
            }
        }
    }
    static loadSounds() {
        SOUND_LIST[Sounds.MENU] = loadSound('assets/sounds/menu.mp3');
        SOUND_LIST[Sounds.MENU].setLoop(true);
        SOUND_LIST[Sounds.GAME] = loadSound('assets/sounds/game.mp3');
        SOUND_LIST[Sounds.GAME].setLoop(true);
        SOUND_LIST[Sounds.POSITIVE] = loadSound('assets/sounds/positive.wav');
        SOUND_LIST[Sounds.NEGATIVE] = loadSound('assets/sounds/negative.wav');
        SOUND_LIST[Sounds.GAME_OVER] = loadSound('assets/sounds/lost.wav');
        SOUND_LIST[Sounds.GAME_START] = loadSound('assets/sounds/start.mp3');
        SOUND_LIST[Sounds.TYPE] = loadSound('assets/sounds/single-type.wav');
        SOUND_LIST[Sounds.SPECIAL_TYPE] = loadSound('assets/sounds/click.wav');
    }
    static toggleSound() {
        Sound.sound_active = !Sound.sound_active;
        if (Sound.sound_active === false) {
            console.log('stop bg music');
            this.current_bg_sound.stop();
        }
        else {
            if (this.current_bg_sound !== null) {
                this.current_bg_sound.play();
            }
        }
    }
}
Sound.sound_active = false;
Sound.current_bg_sound = null;
