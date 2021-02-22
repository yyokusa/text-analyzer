import React, { useState } from "react";
import AnalyzedInfoItem from "./AnalyzedInfoItem";
import { analyzeText, getLanguageOfTheText } from "./logic.js";

function App() {
  const [textInfo, setTextInfo] = useState({
    text: "",
    wordCount: 0,
    numberOfLetters: 0,
    language: "Need More Characters",
    longestWord: "",
    averageWordLength: 0,
    readingDurationInSec: 0,
    medianWordLength: 0,
    medianWord: "",
    mostCommonWords: []
  });

  const handleChange = (event) => {
    const { value: textToAnalyze, name } = event.target;
    setTextInfo((prevState) => ({
      ...prevState,
      [name]: textToAnalyze
    }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    const textToAnalyze = textInfo.text;
    const {
      wordCount,
      numberOfLetters,
      longestWord,
      averageWordLength,
      readingDurationInSec,
      medianWordLength,
      medianWord,
      mostCommonWords
    } = analyzeText(textToAnalyze);
    setTextInfo((prevState) => ({
      ...prevState,
      wordCount: wordCount,
      numberOfLetters: numberOfLetters,
      longestWord: longestWord,
      averageWordLength: averageWordLength,
      readingDurationInSec: readingDurationInSec,
      medianWordLength: medianWordLength,
      medianWord: medianWord,
      mostCommonWords: mostCommonWords
    }));
    // for text language
    if (numberOfLetters >= 64) {
      getLanguageOfTheText(textToAnalyze).then((lang) =>
        setTextInfo((prevState) => ({
          ...prevState,
          language: lang
        }))
      );
    }
  };

  return (
    <div className="container">
      <h1>Text Analyzer</h1>
      <form>
        <textarea
          onChange={handleChange}
          value={textInfo.text}
          name="text"
          placeholder="Enter text..."
        />
        <button type="submit" onClick={handleClick}>
          Analyze
        </button>
      </form>
      <div>
        <AnalyzedInfoItem content={textInfo.wordCount} type="wordCount" />
        <AnalyzedInfoItem
          content={textInfo.numberOfLetters}
          type="numberOfLetters"
        />
        <AnalyzedInfoItem content={textInfo.longestWord} type="longestWord" />
        <AnalyzedInfoItem
          content={textInfo.averageWordLength}
          type="averageWordLength"
        />
        <AnalyzedInfoItem
          content={textInfo.readingDurationInSec}
          type="readingDurationInSec"
        />
        <AnalyzedInfoItem
          content={textInfo.medianWordLength}
          type="medianWordLength"
        />
        <AnalyzedInfoItem content={textInfo.medianWord} type="medianWord" />
        <AnalyzedInfoItem
          content={textInfo.mostCommonWords}
          type="mostCommonWords"
        />
        <AnalyzedInfoItem content={textInfo.language} type="language" />
      </div>
    </div>
  );
}

export default App;
