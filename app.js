/**
 * Play button to play the Morse code sound
 */
const PlayBtn = Vue.component('PlayBtn', {
    template: `<button @click="playMorse">Play!</button>`,
    props: ['result'],
    methods: {
        playMorse() {
            MORSE_AUDIO.createAudioArray(this.result.phrase).playAll();
        }
    }
});

const ErrorMsg = Vue.component('ErrorMsg', {
    template: `<div class="error">
        <p>Please remove all punctuation and special characters &nbsp;<span>X</span></p>
    </div>`
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
                <p><pre>{{ result.morse }}</pre></p>
                <small>{{ result.phrase }}</small>
                <PlayBtn v-bind:result="result"></PlayBtn>
            </div>`,
    props: ['result']
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
        error: false
    },
    methods: {
        translate() {
            try {
                if(this.output != null) {
                    this.history.unshift(this.output);
                }
                this.output = new Morse(this.input);
                console.log(this.output);
                localStorage.setItem('morse', JSON.stringify(this.history));
                this.error = false;
            } catch {
                this.error = true;
            } finally {
                this.input = '';
            }
        },
        clearHistory() {
            this.history = [];
            localStorage.removeItem('morse');
        }
    },
    created() {
        const history = JSON.parse(localStorage.getItem('morse'));
        this.history = history === null ? [] : history;
    }
});