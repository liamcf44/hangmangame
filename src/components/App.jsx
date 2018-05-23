import React, { Component } from 'react';
import '../App.css';
import Words from 'an-array-of-english-words';

let words = Words.filter(word => word.length > 5);

class App extends Component {
  state = {
    alphabet: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ],
    incorrectGuesses: [],
    correctGuesses: [],
    answer: words[Math.floor(Math.random() * words.length)],
    lives: 10
  };

  render() {
    const { alphabet, incorrectGuesses, correctGuesses, answer } = this.state;
    if (
      correctGuesses.length ===
      answer
        .split('')
        .filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
        .join('').length
    ) {
      alert('YOU WON!!!');
      this.handleEndGame();
    }

    return (
      <div>
        <h1>Hangman Game</h1>
        <div className="guessingArea">
          {answer
            .toUpperCase()
            .split('')
            .map((letter, i) => {
              if (correctGuesses.includes(letter)) {
                return <span key={i}>{letter}</span>;
              } else return <span key={i}>__ </span>;
            })}
        </div>
        <br />
        <div className="letterbuttons">
          {alphabet.map((letter, i) => {
            let newClass;
            incorrectGuesses.includes(letter)
              ? (newClass = 'incorrectGuess')
              : correctGuesses.includes(letter)
                ? (newClass = 'correctGuess')
                : (newClass = '');
            return (
              <button
                onClick={this.handleLetterClick}
                value={letter}
                className={newClass}
                key={i}
              >
                {letter}
              </button>
            );
          })}
        </div>
        <div className="livesDiv">{this.handleLives()}</div>
      </div>
    );
  }

  handleLetterClick = e => {
    const { incorrectGuesses, correctGuesses, answer, lives } = this.state;
    if (answer.toLowerCase().includes(e.target.value.toLowerCase())) {
      // e.target.disabled = true;
      e.target.className = 'correctGuess';
      this.setState({
        correctGuesses: [...correctGuesses, e.target.value]
      });
    } else {
      // e.target.disabled = true;
      e.target.className = 'incorrectGuess';
      this.setState({
        incorrectGuesses: [...incorrectGuesses, e.target.value]
      });
      this.setState({
        lives: lives - 1
      });
    }
  };

  handleLives = () => {
    const { lives } = this.state;
    if (lives > 0) return <span className="lives">{lives}</span>;
    else {
      alert('GAME OVER!');
      this.handleEndGame();
    }
  };

  handleEndGame = () => {
    this.setState({
      incorrectGuesses: [],
      correctGuesses: [],
      answer: words[Math.floor(Math.random() * words.length)],
      lives: 10
    });
  };
}

export default App;
