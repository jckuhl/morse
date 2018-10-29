/**
 * Creates a Morse object containing both the original phrase and the translated phrase
 * @author Jonathan Kuhl
 */


'use strict';

class Morse {

    constructor(phrase) {
        this.phrase = phrase;
        this.morse = Morse.toMorse(this.phrase);
    }

    /**
     * Returns the morse code representation
     * @returns {string}
     */
    getMorse() {
        return this.morse;
    }

    /**
     * Returns the plain text representation
     * @returns {string}
     */
    getPhrase() {
        return this.phrase;
    }

    /**
     * Returns an object containing the morse code definitions, or if a parameter is provided,
     * returns the matching value
     * @param {string} char
     * @returns {object | string}
     */
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
            9: '- - - - *', 10: '- - - - -'
        };
        return char === '' ? MORSE : MORSE[char];
    }

    /**
     * Translates plaintext to morse code
     * @param {string} word 
     * @return {string} translated string
     */
    static toMorse(word) {
        const matches = word.toString().match(/[^a-zA-Z0-9\s]+/g);
        if(matches) {
            throw new Error('invalid string: ' + matches.toString());
        }
        
        return word.toLowerCase().split('').map(char => {
            return char === ' ' ? Morse.SEVENSPACES : this.getMorse(char);
        }).join(' '.repeat(3));
    }

    /**
     * Translates morse code into plaintext
     * @param {string} morse 
     * @returns {string} plaintext
     */
    static fromMorse(morse) {
        if(!morse.match(/[^*-\S]/)) {
            throw new Error('invalid string');
        }

        return morse.split(Morse.SEVENSPACES).map(word => {
            return word.split(' '.repeat(3)).map(char => {
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

Morse.SEVENSPACES = ' '.repeat(7);