// 1. Child Component: Cell/Square
Vue.component('tick', {
    props: ['val'],
    template: `
        <div class="cell">
            {{ val }}
        </div>
    `
});

// 2. Parent Composite Component: Board
Vue.component('board', {
    // data MUST be a function returning an object so each <board> instance
    // maintains its own isolated, independent state
    data: function () {
        return {
            board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            next: 1
        };
    },
    template: `
        <div>
            <div class="board-top">
                <h3>{{ headmsg }}</h3>
            </div>
            <div class="board">
                <tick 
                    v-for="(v, i) in board" 
                    :key="i"
                    :val="v2c(v)" 
                    @click.native="update(i)">
                </tick>
            </div>
        </div>
    `,
    methods: {
        v2c: function (val) {
            return val === 1 ? 'X' : (val === -1 ? 'O' : ' ');
        },
        update: function (i) {
            if (this.result === 0 && this.board[i] === 0) {
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
                if (sum === 3) return 1;    // X won
                if (sum === -3) return -1;  // O won
            }

            if (this.board.includes(0)) {
                return 0; // In progress
            }
            return 2; // Draw
        },
        headmsg: function () {
            if (this.result === 0) {
                let current = this.next === 1 ? 'X' : 'O';
                return `Next move: ${current}`;
            } else if (this.result === 1) {
                return 'Congratulations! X Won!';
            } else if (this.result === -1) {
                return 'Congratulations! O Won!';
            } else if (this.result === 2) {
                return 'Oh that was a boring draw!';
            }
        }
    }
});

// 3. Root Vue instance
var app = new Vue({
    el: '#app'
});