import React from 'react';
import './App.css';
import Board from './Board';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      nextPlayer: 'x',
      history: [
        Array(9).fill(null)
      ],
      winner: '',
      move_counter: 0,
      hasNext: true
    }
    this.onClick = this.onClick.bind(this); // need this when pass function to child component ? or use setState ?
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  isGameset(board) {
    const winner = this.calculateWinner(board);

    if (winner !== null) {
      this.setState({
        winner: winner,
        hasNext: false
      })
    }
  }

  onClick(location) {
    if (!this.state.hasNext) {
      return
    }
    if(this.calculateWinner(this.state.history[this.state.move_counter])){
      return
    }
    const new_board = this.state.history[this.state.move_counter].slice();
    let new_history = this.state.history.slice();
    const isNull = new_board[location];

    if (isNull !== null) {
      return
    }

    if (this.state.winner) {
      this.setState({
        winner: ''
      })
    }

    new_history = this.state.history.slice(0, this.state.move_counter + 1); // Adgust history for go back buttons

    if (this.state.move_counter % 2 !== 0) {
      new_board[location] = 'o'
    } else if (this.state.move_counter % 2 === 0) {
      new_board[location] = 'x'
    }

    let next_player = ''
    if (this.state.nextPlayer === 'x') {
      next_player = 'o'
    } else {
      next_player = 'x'
    }

    // this.isGameset(new_board)

    new_history.push(new_board)

    this.setState({
      history: new_history,
      nextPlayer: next_player,
      move_counter: this.state.move_counter + 1
    })
  }

  goBackToPrev(index) {
    let next_player = '';
    let isWinner = '';
    let next = true;

    if (index % 2 === 0) {
      next_player = 'x'
    } else {
      next_player = 'o'
    }

    if (this.state.history.length - 1 === index && this.state.winner !== '') {
      isWinner = this.state.winner;
      next = false;
    }

    this.setState({
      move_counter: index,
      nextPlayer: next_player,
      hasNext: next
    })
  }

  render() {
    let i = 0;
    const buttons = this.state.history.map((board, index) => {
      return (
        <button key={i} style={{ display: 'block' }} onClick={() => this.goBackToPrev(index)}>Go to move #{i++}</button>
      )
    })

    const current = this.state.history[this.state.move_counter];
    const winner = this.calculateWinner(current);
    let status;
    if (winner) {
      status = "Winner: " + winner;
      console.log(winner)
    } else {
      status = "Next player: " + (this.state.move_counter % 2 === 0 ? "X" : "O");
    }


    return (
      <div className="App">
        {/* {!this.state.hasNext ?
          <h1 style={{ float: 'right', paddingRight: '100px' }}>Winner is {this.state.winner} !</h1>
          :
          <h1 style={{ float: 'right', paddingRight: '100px' }}>Next Player: {this.state.nextPlayer}</h1>
        } */}
        <div>{status}</div>
        <Board
          onClick={this.onClick}
          board={this.state.history[this.state.move_counter]}
        />
        {buttons}
      </div>
    );
  }
}

export default App;
