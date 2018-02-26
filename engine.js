
class Player {
  constructor(game, side) {
    if(!game || !side) {
      throw new Error(`'game' and 'side' properties are required.`);
    }

    this.game = game;
    this.side = side;
  }

  play(...args) {
    throw new Error('play() must be implemented.');
  }
};

class Human extends Player {
  constructor(game, side = 'X') {
    super(game, side);
  }

  play(y, x) {
    const { game, side } = this;

    game.move(y, x, side);
  }
}

class Computer extends Player {
  constructor(game, side = 'O') {
    super(game, side);
  }

  play() {
    const { game, side } = this;

    for(let y = 0; y < 3; y++) {
      for(let x = 0; x < 3; x++) {
        if(game.board[y][x] === ' ') {
          game.move(y, x, side);

          return;
        }
      }
    }
  }
};

class HumanVsComputerMatch {
  constructor(human = 'X', computer = 'O') {
    const game = this.game = new Game();

    this.players = {
      human: new Player(game, human),
      computer: new Computer(game, computer),
    };

    this.turn = human === 'X' ? this.players.human: this.players.computer;

    if(computer === 'X') {
      this.computer();
    }
  }

  next() {
    if(this.turn === this.players.human) {
      this.turn = this.players.computer;
    } else {
      this.turn = this.players.human;
    }
  }

  human(y, x) {
    if(this.turn !== this.players.human) {
      throw new Error('incorrect player turn.');
    }

    this.players.human.play(y, x);

    this.next();
  }

  computer() {
    if(this.turn !== this.players.computer) {
      throw new Error('Incorrect player turn.');
    }

    this.players.computer.play();

    this.next();
  }

  status() {
    return this.game.status();
  }
};

class Game {
  constructor() {
    this.board = [1,2,3].map(() => [' ', ' ', ' ']);
  }

  get draw() {
    return this.board.filter(row => row.filter(cell => cell !== ' ').length === 0).length === 0;
  }

  checkWin(side) {
    const board = this.board;

    // check horizontal match
    for(let y = 0; y < 3; y++) {
      if((board[y][0] === board[y][1]) && (board[y][1] === board[y][2]) && (board[y][0] === side)) {
        return side;
      }
    }

    // check vertical match
    for(let x = 0; x < 3; x++) {
      if((board[0][x] === board[1][x]) && (board[1][x] === board[2][x]) && (board[1][x] === side)) {
        return side;
      }
    }

    // check diagonal \ and /
    if((board[0][0] === board[1][1]) && (board[2][2] === board[1][1]) && (board[1][1] === side)) {
      return side;
    } else if((board[0][2] === board[1][1]) && (board[2][0] === board[1][1]) && (board[1][1] === side)) {
      return side;
    }
  }

  get win() {
    return this.checkWin('X') || this.checkWin('O');
  }

  status() {
    const { win, draw } = this;

    return {
      draw,
      win
    }
  }

  get over () {
    const { draw, win } = this.status();

    return draw || win !== undefined;
  }

  move(y, x, side) {
    if(this.board[x][y] !== ' ') {
      throw new Error('Invalid move. Square is already played.');
    }

    this.board[x][y] = side;

    return this.status();
  }
};

module.exports = {
  HumanVsComputerMatch,
  Human,
  Computer,
  Player,
  Game
}
