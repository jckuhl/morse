const Result = Vue.component('Result', {
    template: `
            <div v-if="result">
                <p>{{ result.morse }}</p>
                <small>{{ result.phrase }}</small>
                <button @click="playMorse">Play!</button>
            </div>`,
    props: ['result'],
    methods: {
        playMorse() {
            MORSE_AUDIO.createAudioArray(this.result.phrase).playAll();
        }
    }
})

new Vue({
    el: '#app',
    components: {
        Result
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