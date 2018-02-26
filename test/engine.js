const assert = require('assert');
const should = require('should');

const _ = require('lodash');

const { HumanVsComputerMatch, Game, Player, Human, Computer } = require('../engine.js');

describe('Player', function() {
  it('should throw constructor errors for game and side', function() {
    (function() { new Player(); }).should.throw(Error);
  });

  it('should intialize with game and side', function() {
    const game = new Game();
    const side = 'X';

    const player = new Player(game, side);

    player.game.should.equal(game);
    player.side.should.equal(side);
  });
});

describe('Human', function() {
  it('should throw constructor errors for game and side', function() {
    (function() { new Human(); }).should.throw(Error);
  });

  it('should intialize with game and side', function() {
    const game = new Game();
    const side = 'X';

    const player = new Human(game, side);

    player.game.should.equal(game);
    player.side.should.equal(side);
  });
});

describe('Computer', function() {
  it('should throw constructor errors for game and side', function() {
    (function() { new Computer(); }).should.throw(Error);
  });

  it('should intialize with game and side', function() {
    const game = new Game();
    const side = 'X';

    const player = new Computer(game, side);

    player.game.should.equal(game);
    player.side.should.equal(side);
  });
});

describe('Game', function() {
  it('should initialize with empty board', function() {
    const game = new Game();

    game.should.be.ok;

    game.board.length.should.equal(3);

    const squares = _.flatten(game.board);

    squares.length.should.equal(9);

    squares.filter(square => square === ' ').length.should.equal(9);
  });

  it('should initialize with draw=false, win=null', function() {
    const game = new Game();

    game.should.be.ok;

    const { draw, win } = game.status();

    draw.should.be.false;

    should(win).not.be.ok;
  });

  it('should make the right moves', function() {
    const game = new Game();

    game.should.be.ok;

    game.move(0, 0, 'X');
    game.board[0][0].should.equal('X');

    game.move(2, 2, 'O');
    game.board[2][2].should.equal('O');

    const squares = _.flatten(game.board);

    squares.should.be.eql([ 'X', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'O' ]);
  });

  it('should say the game is not over', function() {
    const game = new Game();

    game.should.be.ok;

    game.over.should.be.false;
  });

  it('should say the game is over for a draw', function() {
    const game = new Game();

    game.should.be.ok;

    game.board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O']
    ];

    game.status().draw.should.be.true;
    game.over.should.be.true;
  });

  it('should say the game a win for X', function() {
    const game = new Game();

    game.should.be.ok;

    game.board = [
      ['X', 'O', 'X'],
      [' ', 'X', 'O'],
      ['X', ' ', 'O']
    ];

    game.over.should.be.true;

    game.win.should.equal('X');
    game.status().win.should.equal('X');
  });

  it('should say the game a win for O', function() {
    const game = new Game();

    game.should.be.ok;

    game.board = [
      ['O', 'X', ' '],
      ['O', 'X', 'X'],
      ['O', 'O', 'X']
    ];

    game.over.should.be.true;

    game.win.should.equal('O');
    game.status().win.should.equal('O');
  });
});

describe('HumanVsComputerMatch', function() {
  it('should start with computer and human properly initialized', function() {
    const match = new HumanVsComputerMatch('O', 'X');

    match.players.computer.side.should.be.ok;
    match.players.computer.game.should.be.ok;

    match.players.human.side.should.be.ok;
    match.players.human.game.should.be.ok;
  });

  it('should start with X playing first', function() {
    const match = new HumanVsComputerMatch('X', 'O');

    match.turn.side.should.equal('X');
  });

  it('should start with human playing first', function() {
    const match = new HumanVsComputerMatch('X', 'O');

    match.turn.side.should.equal('X');
    match.players.human.side.should.equal('X');
  });

  it('should start with computer playing first', function() {
    const match = new HumanVsComputerMatch('O', 'X');

    match.players.computer.side.should.equal('X');
    match.turn.side.should.equal('O');
  });

  // it('should play a game', function() {
  //   const match = new HumanVsComputerMatch('X', 'O');
  //
  //   while(!match.game.over) {
  //
  //   }
  // });
});
