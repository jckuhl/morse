/**
 * Contains the Vue components controlling the UI
 * @author Jonathan Kuhl
*/

'use strict';

/**
 * Filter for displaying morse code
 * This replaces the basic asterisk/hyphen with symbols that display better
 */
Vue.filter('morse', (value)=> {
    if(!value || typeof value !== 'string') {
        return ''
    }
    return value.split('').map(dotdash=> {
        // dotdash can only be one of the three symbols below:
        const symbols = {
            '*': '•',
            '-': '⁃',
            ' ': ' '
        }
        return symbols[dotdash];
    }).join('');
});

/**
 * Play button to play the Morse code sound
 */
const PlayBtn = Vue.component('PlayBtn', {
    template: `<button @click="playMorse">Play!</button>`,
    props: ['result'],
    methods: {
        playMorse() {
            if(!Object.getOwnPropertyNames(this.result.audio).includes('playAll')) {
                this.result.audio = MORSE_AUDIO.createAudioArray(this.result.text.phrase);
            }
            this.result.audio.playAll();
        }
    },
    created() {
        console.log(Object.getOwnPropertyNames(this.result.audio));
    }
});

const ErrorMsg = Vue.component('ErrorMsg', {
    template: `<div class="error">
        <p>The following characters are invalid: {{ error }} &nbsp;
            <button class="close" @click="close">&times;</button>
        </p>
    </div>`,
    props: ['error'],
    methods: {
        close() {
            this.$emit('close-error');
        }
    }
}) 

/**
 * The result of the most current translation
 */
const ResultBox = Vue.component('ResultBox', {
    components: {
        PlayBtn
    },
    template: `
            <div v-if="result">
                <p><pre>{{ result.text.morse | morse }}</pre></p>
                <small>{{ result.text.phrase }}</small>
                <PlayBtn v-bind:result="result"></PlayBtn>
                <button ref="stopbtn" @click="stopAudio">Stop</button>
            </div>`,
    props: ['result'],
    methods: {
        stopAudio() {
            this.result.audio.stopAll();
        }
    }
})

/**
 * Root component
 */
new Vue({
    el: '#app',
    components: {
        ResultBox,
        PlayBtn,
        ErrorMsg
    },
    data: {
        input: '',
        output: null,
        history: [],
        error: false,
        idset: new Set(),
        stopEvent: new Event('morse-stop')
    },
    computed: {
        isDisabled() {
            return this.input.trim().length === 0;
        }
    },
    methods: {
        translate() {
            const getId = ()=> {
                let id;
                do {
                    id = Math.floor(Math.random() * 1000000);
                    if(!this.idset.has(id)) {
                        this.idset.add(id);
                    }
                } while(!this.idset.has(id));
                return id;
            };
            try {
                let id = getId();
                const text = new Morse(this.input.trim());
                const audio = MORSE_AUDIO.createAudioArray(text.phrase);
                this.output = { text , audio }
                this.history.unshift({ output: this.output, id: id});
                localStorage.setItem('morse', JSON.stringify(this.history));
                this.error = null;
                this.input = '';
            } catch(error) {
                if(error instanceof MorseError) {
                    // splitting by a ":" puts the erroneous characters at index 2.
                    this.error = error.toString().split(':')[2].trim();
                } else {
                    console.error(error);
                }
            } 
        },
        clearHistory() {
            this.history = [];
            localStorage.removeItem('morse');
        },
        deleteItem(id) {
            this.history = this.history.filter(history => history.id !== id);

            // if deleting the object sets length to zero, simply remove it from LS.
            if(this.history.length > 0) {
                localStorage.setItem('morse', JSON.stringify(this.history));
            } else {
                localStorage.removeItem('morse');
            }
        },
        closeErrorMsg() {
            this.error = null;
        }
    },
    // On creation, check if there's data in LS.  If there is, set history to it, else set an []
    created() {
        const history = JSON.parse(localStorage.getItem('morse'));
        this.history = history ? history : [];
    }
});