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
        error: false,
        idset: new Set()
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
                this.output = new Morse(this.input);
                this.history.unshift({ output: this.output, id: id});
                localStorage.setItem('morse', JSON.stringify(this.history));
                this.error = false;
            } catch(error) {
                console.error(error);
                this.error = true;
            } finally {
                this.input = '';
                console.log(this.history);
            }
        },
        clearHistory() {
            this.history = [];
            localStorage.removeItem('morse');
        },
        deleteItem(index) {
            this.history = this.history.splice(index);
            localStorage.setItem('morse', JSON.stringify(this.history));
        }
    },
    created() {
        const history = JSON.parse(localStorage.getItem('morse'));
        this.history = history === null ? [] : history;
    }
});