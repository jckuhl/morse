/**
 * MORSE_AUDIO contains the paths for all the mp3 files as well as
 * methods for creating audio elements, and creating an array of audio elements
 * based on an input phrase, and a method to play all the audio one after another
 * @author Jonathan Kuhl
 */

const MORSE_AUDIO = {
    // Source paths for the MP3 files
    dashanddot: {
        dash: './audio/Dash & Dot/Mountain Audio - Complete Morse Code Bundle - DASH.mp3',
        dot: './audio/Dash & Dot/Mountain Audio - Complete Morse Code Bundle - DOT.mp3',
    },
    gaps: {
        oneunit: './audio/Gaps/Mountain Audio - Complete Morse Code Bundle - ONE UNIT GAP.mp3',
        threeunit: './audio/Gaps/Mountain Audio - Complete Morse Code Bundle - THREE UNITS GAP.mp3',
        word: './audio/Gaps/Mountain Audio - Complete Morse Code Bundle - WORD GAP.mp3'
    },
    letters: {
        a: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - A.mp3',
        b: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - B.mp3',
        c: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - C.mp3',
        d: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - D.mp3',
        e: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - E.mp3',
        f: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - F.mp3',
        g: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - G.mp3',
        h: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - H.mp3',
        i: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - I.mp3',
        j: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - J.mp3',
        k: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - K.mp3',
        l: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - L.mp3',
        m: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - M.mp3',
        n: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - N.mp3',
        o: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - O.mp3',
        p: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - P.mp3',
        q: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - Q.mp3',
        r: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - R.mp3',
        s: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - S.mp3',
        t: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - T.mp3',
        u: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - U.mp3',
        v: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - V.mp3',
        w: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - W.mp3',
        x: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - X.mp3',
        y: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - Y.mp3',
        z: './audio/Letters/Mountain Audio - Complete Morse Code Bundle - Z.mp3'
    },
    numbers: {
        0: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 0.mp3',
        1: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 1.mp3',
        2: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 2.mp3',
        3: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 3.mp3',
        4: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 4.mp3',
        5: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 5.mp3',
        6: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 6.mp3',
        7: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 7.mp3',
        8: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 8.mp3',
        9: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 9.mp3'
    },

    /**
     * Creates an <audio> element with the given source
     * @param {string} source path to the appropriate mp3 file
     * @returns {AudioNode}
     */
    createAudio(source) {
        const audio = document.createElement('audio');
        audio.src = source;
        // audio.addEventListener('morse-stop', ()=> console.log('stahp!'));
        // document.getElementById('audio').appendChild(audio);
        return audio;
    },

    /**
     * Creates an object containing both an array of <audio> objects and a method to play them.
     * The array is based on matching the letters in the phrase to the appropriate morse code MP3 files
     * @param {string} phrase 
     * @returns {object} an object with the audio array and a playAll method
     */
    createAudioArray(phrase) {
        return { 
            audio: phrase.toLowerCase().split('').map(char => {
                if(char.match(/([a-z])+/g)) {
                    return this.createAudio(this.letters[char]);
                } else if(char.match(/([0-9])+/g)) {
                    return this.createAudio(this.numbers[char]);
                } else if(char === ' ') {
                    return this.createAudio(this.gaps.word);
                }
            }),

            /**
             * Plays all the audio files, one after another, in the audio array.
             */
            playAll() {
                this.audio.forEach((a, i) => {
                    if(i === 0) {
                        a.play();
                    } else {
                        this.audio[i - 1].addEventListener('ended', ()=> a.play());
                    }
                });
            },

            stopAll() {
                this.audio.forEach(a => a.pause());
            }
        };   
    }
};

(function() {
    [document.getElementById('dash'), document.getElementById('dot')].forEach(audioLink => {
        audioLink.addEventListener('click', ()=> {
            MORSE_AUDIO.createAudio(MORSE_AUDIO.dashanddot[audioLink.id]).play();
        });
    });
})();