import React from 'react';
import './App.css';
import Board from './Board';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        Array(9).fill(null)
      ],
      move_counter: 0,
    }
    this.onClick = this.onClick.bind(this); 
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


  onClick(location) {
    const new_history = this.state.history.slice(0, this.state.move_counter + 1); // Adgust history for go back buttons
    const new_board = this.state.history[this.state.move_counter].slice();

    if (this.calculateWinner(this.state.history[this.state.move_counter]) || new_board[location]) {
      return
    }

    new_board[location] = (this.state.move_counter % 2 === 0 ? 'x' : 'o');

    this.setState({
      history: [...new_history, new_board],
      move_counter: this.state.move_counter + 1
    })
  }

  goBackToPrev(index) {
    this.setState({
      move_counter: index,
    })
  }

  render() {
    const buttons = this.state.history.map((board, index) => {
      const desc = index ?
        'Go to move #' + index :
        'Go to game start';
      return (
        <button key={index} style={{ display: 'block' }} onClick={() => this.goBackToPrev(index)}>{desc}</button>
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
