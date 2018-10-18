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
})

/**
 * The result of the most current translation
 */
const Result = Vue.component('Result', {
    components: {
        PlayBtn
    },
    template: `
            <div v-if="result">
                <p>{{ result.morse }}</p>
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
        Result,
        PlayBtn
    },
    data: {
        input: '',
        output: null,
        history: []
    },
    methods: {
        translate() {
            try {
                this.output = new Morse(this.input);
                this.history.unshift(this.output);
                localStorage.setItem('morse', JSON.stringify(this.history));
            } catch {
                // display an error
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