import React from 'react';

function ChooseTopic({ topics, selectTopic }) {
  return (
    <select onChange={selectTopic}>
      <option disabled>Choose Topic</option>
      {topics.map((topic, i) => {
        return (
          <option key={i} value={topic}>
            {topic}
          </option>
        );
      })}
    </select>
  );
}

export default ChooseTopic;
