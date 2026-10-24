// Register the custom <tic> component
Vue.component('tic', {
    props: ['pos'],
    template: `
        <span @click="set_val">
            <img :src="img_l">
        </span>
    `,
    methods: {
        set_val: function () {
            // Calls set_val on the parent Vue instance ($root)
            this.$root.set_val(this.pos);
        }
    },
    computed: {
        img_l: function () {
            let mapping = { '-1': 'o', '0': 'b', '1': 'x' };
            let val = this.$root.board[this.pos];
            return `assets/${mapping[val]}.png`;
        }
    }
});

// Main Vue instance
var app = new Vue({
    el: '#app',
    data: {
        board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        next: 1
    },
    methods: {
        set_val: function (i) {
            if (this.result === 0 && this.board[i] === 0) {
                // Vue 2 cannot detect direct index assignment (this.board[i] = val),
                // so Vue.set must be used for array reactivity
                Vue.set(this.board, i, this.next);
                this.next = -this.next;
            }
        }
    },
    computed: {
        result: function () {
            let patts = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            for (let p of patts) {
                let sum = this.board[p[0]] + this.board[p[1]] + this.board[p[2]];
                if (sum === 3) return 1;    // X wins
                if (sum === -3) return -1;  // O wins
            }

            if (this.board.includes(0)) {
                return 0; // In progress
            }
            return 2; // Draw
        },
        headmsg: function () {
            if (this.result === 0) {
                let current = this.next === 1 ? 'x' : 'o';
                return `<h1>Next move: <img src="assets/${current}.png"></h1>`;
            } else if (this.result === 1) {
                return `<h1>Congratulations! X Won!</h1>`;
            } else if (this.result === -1) {
                return `<h1>Congratulations! O Won!</h1>`;
            } else if (this.result === 2) {
                return `<h1>Oh that was a boring draw!</h1>`;
            }
        }
    }
});