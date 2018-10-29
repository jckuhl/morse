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
            this.$emit('stop-all');
            const playAllNotAFunction = ()=> !Object.getOwnPropertyNames(this.result.audio).includes('playAll');
            // if pulled from LS, JSON nuked the playAll method, so we'll have to recreate it
            if(playAllNotAFunction) {
                this.result.audio = MORSE_AUDIO.createAudioArray(this.result.text.phrase);
            }
            this.result.audio.playAll();
        }
    }
});

const StopBtn = Vue.component('StopBtn', {
    template: `<button @click="stopMorse">Stop</button>`,
    props: ['result', 'id'],
    methods: {
        // stopMorse() {
        //     const stopAllNotAFunction = ()=> !Object.getOwnPropertyNames(this.result.audio).includes('stopAll');
        //     if(stopAllNotAFunction) {
        //         this.result.audio = MORSE_AUDIO.createAudioArray(this.result.text.phrase);
        //     }
        //     this.result.audio.stopAll();
        // }
        stopMorse() {
            this.$emit('stop-audio', this.id);
        }
    }
});

/**
 * The result of the most current translation
 */

//<button ref="stopbtn" @click="stopAudio">Stop</button>
const ResultBox = Vue.component('ResultBox', {
    components: {
        PlayBtn
    },
    template: `
            <div v-if="result">
                <p>Translation: <pre>{{ result.text.morse | morse }}</pre></p>
                <p>Original: <small>{{ result.text.phrase }}</small></p>
                <PlayBtn v-bind:result="result" @stop-all="$emit('stop-all')"></PlayBtn>
                <StopBtn v-bind:result="result" v-bind:id="-1" @stop-audio="stopAudio"></StopBtn>
            </div>`,
    props: ['result'],
    methods: {
        stopAudio() {
            this.result.audio.stopAll();
        }
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
        },
        stopAudio(id) {
            let audio = this.history.filter(entry => entry.id === id)[0].output.audio;
            if(Object.getOwnPropertyNames(audio).includes('stopAll')) {
                audio.stopAll();
            }
            // else it isn't playing and therefore doesn't need to be stopped.
        },
        stopAllAudio() {
            this.history.forEach(entry => {
                this.stopAudio(entry.id);
            });
        }
    },
    // On creation, check if there's data in LS.  If there is, set history to it, else set an []
    created() {
        const history = JSON.parse(localStorage.getItem('morse'));
        this.history = history ? history : [];
    }
});