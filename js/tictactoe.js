let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let next = 1;
let gstate = 0; // 0: in progress, 1: X won, -1: O won, 2: draw

function get_img(val) {
    let mapping = { '-1': 'o', '0': 'b', '1': 'x' };
    return `<img src="assets/${mapping[val]}.png">`;
}

function checkstate(b) {
    let patts = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let p of patts) {
        let sum = b[p[0]] + b[p[1]] + b[p[2]];
        if (sum === 3) return 1;
        if (sum === -3) return -1;
    }

    if (b.includes(0)) {
        return 0; // In progress
    }
    return 2; // Draw
}

function update_page() {
    let next_elem = document.getElementById("next");

    if (gstate === 0) {
        let current = next === 1 ? 'x' : 'o';
        next_elem.innerHTML = `<h1>Next move: <img src="assets/${current}.png"></h1>`;
    } else if (gstate === 1) {
        next_elem.innerHTML = `<h1>Congratulations! X Won!</h1> <button onclick="reset_board()">Play Again</button>`;
    } else if (gstate === -1) {
        next_elem.innerHTML = `<h1>Congratulations! O Won!</h1> <button onclick="reset_board()">Play Again</button>`;
    } else if (gstate === 2) {
        next_elem.innerHTML = `<h1>Oh that was a boring draw!</h1> <button onclick="reset_board()">Play Again</button>`;
    }

    for (let i = 0; i < 9; i++) {
        let cell = document.getElementById(`td${i}`);
        cell.innerHTML = get_img(board[i]);

        if (board[i] === 0 && gstate === 0) {
            cell.onclick = function () {
                update_entry(i);
            };
        } else {
            cell.onclick = null;
        }
    }
}

function update_entry(i) {
    if (gstate === 0 && board[i] === 0) {
        board[i] = next;
        next = -next;
        gstate = checkstate(board);
        update_page();
    }
}

function reset_board() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    next = 1;
    gstate = 0;
    update_page();
}

// Initial call to set up the board on load
reset_board();