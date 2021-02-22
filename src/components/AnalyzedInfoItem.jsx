import React from "react";

function AnalyzedInfoItem(props) {
  const content = props.content;
  const type = props.type;
  switch (type) {
    case "wordCount":
      return (
        <p className="analyzed-info-item" id="word-count">
          Word Count: {content}
        </p>
      );
    case "numberOfLetters":
      return (
        <p className="analyzed-info-item" id="number-of-letters">
          Number of Letters: {content}
        </p>
      );
    case "longestWord":
      return (
        <p className="analyzed-info-item" id="longest-word">
          Longest Word: {content}
        </p>
      );
    case "averageWordLength":
      return (
        <p className="analyzed-info-item" id="average-word-length">
          Average Word Length: {content}
        </p>
      );
    case "readingDurationInSec":
      return (
        <p className="analyzed-info-item" id="reading-duration">
          Reading Duration: {content} seconds
        </p>
      );
    case "medianWordLength":
      return (
        <p className="analyzed-info-item" id="median-word-length">
          Median Word Length: {content}
        </p>
      );
    case "medianWord":
      return (
        <p className="analyzed-info-item" id="median-word-by-length">
          Median Word by Length: {content}
        </p>
      );
    case "mostCommonWords":
      return (
        <p className="analyzed-info-item" id="most-commons-words">
          Top 5 Most Common Words:{" "}
          {content.map((el) => (
            <span key={el[0]}>{el[0]} </span>
          ))}
        </p>
      );
    case "language":
      return (
        <p className="analyzed-info-item" id="language">
          Language: {content}
        </p>
      );
    default:
      return null;
  }
}

export default AnalyzedInfoItem;
