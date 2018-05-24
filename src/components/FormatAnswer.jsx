import React from 'react';

function FormatAnswer({ answer, correctGuesses }) {
  return answer
    .toUpperCase()
    .split('')
    .map((letter, i) => {
      if (correctGuesses.includes(letter)) {
        return <span key={`correctguess${i}`}>{letter}</span>;
      }
      if (letter === ' ') return <span key={`space${i}`}> / </span>;
      else return <span key={`toguess${i}`}>__ </span>;
    });
}

export default FormatAnswer;
