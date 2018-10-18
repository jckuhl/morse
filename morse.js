class Morse {

    constructor(phrase) {
        this.phrase = phrase;
        this.morse = Morse.toMorse(this.phrase);
    }

    getMorse() {
        return this.morse;
    }

    getPhrase() {
        return this.phrase;
    }

    static getMorse(char='') {

        const MORSE = {
            // Alphabet
            a: '* -',      b: '- * * *',   c: '- * - *',   d: '- * *',
            e: '*',        f: '* * - *',   g: '- - *',     h: '* * * *',
            i: '* *',      j: '* - - -',   k: '- * - *',   l: '* - * *',
            m: '- -',      n: '- *',       o: '- - -',     p: '* - *',
            q: '- - * -',  r: '* - *',     s: '* * *',     t: '-',
            u: '* * -',    v: '* * * -',   w: '* - - ',    x: '- * * -',
            y: '- * - -',  z: '- - * *',

            // Numbers
            1: '* - - - -', 2: '* * - - -', 3: '* * * - -', 4: '* * * * -',
            5: '* * * * *', 6: '- * * * *', 7: '- - * * *', 8: '- - - * *',
            9: '- - - *',  10: '- - - - -'
        };
        return char === '' ? MORSE : MORSE[char];
    }

    static toMorse(word) {
        const SEVENSPACES = '<pre>' + '&nbsp;'.repeat(7) + '</pre>';
        if(!word.match(/[^a-bA-B0-9]+/)) {
            throw new Error('invalid string');
        }
        
        return word.toLowerCase().split('').map(char => {
            return char === ' ' ? SEVENSPACES : this.getMorse(char);
        }).join('   ');
    }

    static fromMorse(morse) {
        const SEVENSPACES = '&nbsp;'.repeat(7);
        if(!morse.match(/[^*-\S]/)) {
            throw new Error('invalid string');
        }

        return morse.split(SEVENSPACES).map(word => {
            return word.split('   ').map(char => {
                let letter;
                Object.entries(this.getMorse()).forEach(([k, v])=> {
                    if(v === char) {
                        letter = k;
                    }
                });
                return letter;
            }).join('');
        }).join(' ');
    }
}