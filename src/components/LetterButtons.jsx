import React from 'react';

function LetterButtons({
  alphabet,
  incorrectGuesses,
  correctGuesses,
  handleLetterClick
}) {
  {
    return alphabet.map((letter, i) => {
      let newClass;
      incorrectGuesses.includes(letter)
        ? (newClass = 'incorrectGuess')
        : correctGuesses.includes(letter)
          ? (newClass = 'correctGuess')
          : (newClass = '');
      return (
        <button
          onClick={handleLetterClick}
          value={letter}
          className={newClass}
          key={i}
        >
          {letter}
        </button>
      );
    });
  }
}

export default LetterButtons;
