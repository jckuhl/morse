MORSE_AUDIO = {
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
        zero: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 0.mp3',
        one: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 1.mp3',
        two: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 2.mp3',
        three: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 3.mp3',
        four: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 4.mp3',
        five: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 5.mp3',
        six: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 6.mp3',
        seven: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 7.mp3',
        eight: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 8.mp3',
        nine: './audio/Numbers/Mountain Audio - Complete Morse Code Bundle - 9.mp3'
    },
    createAudio(source) {
        const audio = document.createElement('audio');
        audio.src = source;
        return audio;
    },
    createAudioArray(phrase) {
        return { 
            audio: phrase.toLowerCase().split('').map(char => {
                if(char.match(/([a-z])+/g)) {
                    return this.createAudio(this.letters[char]);
                } else if(char.match(/([0-9])+/g)) {
                    switch(char) {
                        case 0:
                            return this.createAudio(this.numbers.zero);
                        case 1:
                            return this.createAudio(this.numbers.one);
                        case 2:
                            return this.createAudio(this.numbers.two);
                        case 3:
                            return this.createAudio(this.numbers.three);
                        case 4:
                            return this.createAudio(this.numbers.four);
                        case 5:
                            return this.createAudio(this.numbers.five);
                        case 6:
                            return this.createAudio(this.numbers.six);
                        case 7:
                            return this.createAudio(this.numbers.seven);
                        case 8:
                            return this.createAudio(this.numbers.eight);
                        case 9:
                            return this.createAudio(this.numbers.nine);
                    }
                } else if(char === ' ') {
                    return this.createAudio(this.gaps.word);
                }
            }),
            playAll() {
                this.audio.forEach(a => a.play());
            }
        }   
    },
}