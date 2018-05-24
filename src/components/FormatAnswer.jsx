import React from 'react';

function FormatAnswer({ answer, correctGuesses }) {
  let array = [];
  answer
    .toUpperCase()
    .split('')
    .map((letter, i) => {
      if (correctGuesses.includes(letter))
        array.push(<span key={`correctguess${i}`}>{letter}</span>);
      if (letter === ' ') array.push(<span key={`space${i}`}> / </span>);
      else array.push(<span key={`toguess${i}`}>__ </span>);
    });
  return array;
}

export default FormatAnswer;
