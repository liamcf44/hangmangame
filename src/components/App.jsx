import React, { Component } from 'react';
import FormatAnswer from './FormatAnswer';
import '../App.css';
import Words from 'an-array-of-english-words';
import { countryList } from './countryData';
import { actors } from './actorsData';
console.log(actors, '^^^^^^^^^^^^^^^^^');

let words = Words.filter(word => word.length > 6);

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
    answer: countryList[Math.floor(Math.random() * countryList.length)],
    lives: 10,
    topics: ['Words', 'Countries', 'Actors/Actresses'],
    currentTopic: ''
  };

  render() {
    const {
      alphabet,
      incorrectGuesses,
      correctGuesses,
      answer,
      topics
    } = this.state;
    if (
      answer
        .toUpperCase()
        .split('')
        .every(letter => correctGuesses.includes(letter))
    ) {
      alert(`YOU WON!!! the word was ${answer}`);
      this.handleEndGame();
    }
    console.log(answer);
    return (
      <div>
        <h1>Hangman Game</h1>
        <div className="guessingArea">
          <FormatAnswer answer={answer} correctGuesses={correctGuesses} />
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
        <select onChange={this.selectTopic}>
          <option selected disabled>
            Choose Topic
          </option>
          {topics.map((topic, i) => {
            return (
              <option key={i} value={topic}>
                {topic}
              </option>
            );
          })}
        </select>
        <button onClick={this.handleEndGame}>New Game</button>
      </div>
    );
  }

  selectTopic = e => {
    let topic;
    e.target.value === 'Words'
      ? (topic = words)
      : e.target.value === 'Countries'
        ? (topic = countryList)
        : e.target.value === 'Actors'
          ? (topic = actors)
          : (topic = words);
    this.setState({
      answer: topic[Math.floor(Math.random() * topic.length)],
      currentTopic: e.target.value
    });
  };

  handleLetterClick = e => {
    const { incorrectGuesses, correctGuesses, answer, lives } = this.state;
    if (answer.toLowerCase().includes(e.target.value.toLowerCase())) {
      e.target.className = 'correctGuess';
      this.setState({
        correctGuesses: [...correctGuesses, e.target.value]
      });
    } else {
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
    const { currentTopic } = this.state;
    let topic;
    currentTopic === 'Words'
      ? (topic = words)
      : currentTopic === 'Countries'
        ? (topic = countryList)
        : currentTopic === 'Actors'
          ? (topic = actors)
          : (topic = words);
    this.setState({
      incorrectGuesses: [],
      correctGuesses: [],
      answer: topic[Math.floor(Math.random() * topic.length)],
      lives: 10
    });
  };
}

export default App;
