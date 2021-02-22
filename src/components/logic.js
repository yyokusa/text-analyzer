const tokenizer = require("wink-tokenizer");
const detectLanguage = require("detect-lang");

// analyze certain properties of the text and return an object representing properties
function analyzeText(textToAnalyze) {
  if (textToAnalyze.length === 0) {
    console.log("returning1");
    return {};
  }
  let analyzedText = {};
  const textLength = textToAnalyze.length;
  let t = tokenizer();
  const tokenizedText = t.tokenize(textToAnalyze);
  const wordCount = tokenizedText.length;
  analyzedText["wordCount"] = wordCount;
  analyzedText["numberOfLetters"] = textLength;
  sortAnalyzedText(tokenizedText); // analyzedText is sorted
  analyzedText["longestWord"] = getLongestString(tokenizedText);
  analyzedText["averageWordLength"] = getAvgWordLength(tokenizedText);
  analyzedText["readingDurationInSec"] = getReadingDuration(wordCount);
  const { medianWord, medianWordLength } = getMedianWordAndLength(
    tokenizedText
  );
  analyzedText["medianWordLength"] = medianWordLength;
  analyzedText["medianWord"] = medianWord;
  analyzedText["mostCommonWords"] = getMostCommonWords(tokenizedText);
  return analyzedText;
}

// get language of the text -> it is async api call
function getLanguageOfTheText(textToAnalyze) {
  return detectLanguage(textToAnalyze).then((data) => data.name);
}

// get longest string by sortin array of objects containing words/strings as value member
function getLongestString(tokenizedText) {
  const longest = tokenizedText[0]; // already sorted in a descending manner
  if (typeof longest !== "undefined") {
    return longest.value;
  }
  return null;
}

// get avg word length
function getAvgWordLength(tokenizedText) {
  const analyzedTextLength = tokenizedText.length;
  if (analyzedTextLength > 0) {
    const reducer = (accumulator, word) => accumulator + word.value.length;
    const totalLength = tokenizedText.reduce(reducer, 0);
    let avgLen = totalLength / tokenizedText.length;
    avgLen = avgLen.toFixed(2);
    return avgLen;
  }
  return 0;
}

// get reading duration in seconds
function getReadingDuration(wordCount) {
  if (wordCount > 0) {
    const wordsPerSec = 200 / 60; // Average case.
    return Math.ceil(wordCount / wordsPerSec);
  }
  return 0;
}

// get Median word length
function getMedianWordAndLength(tokenizedText) {
  if (tokenizedText.length > 0) {
    const medianWord =
      tokenizedText[Math.floor(tokenizedText.length / 2)].value;
    let medianWordLength = 0;
    if (typeof medianWord !== "undefined") {
      medianWordLength = medianWord.length;
    }
    return { medianWord, medianWordLength };
  }
  return null;
}

// sorts in place
function sortAnalyzedText(tokenizedText) {
  tokenizedText.sort((a, b) => b.value.length - a.value.length);
}

// traverses the array and returns a dictionary consisting of the most common words
function getMostCommonWords(tokenizedText) {
  if (tokenizedText.length === 0) return null;
  let wordsMapping = {};
  for (let i = 0; i < tokenizedText.length; i++) {
    let curr = tokenizedText[i].value;
    if (wordsMapping[curr] == null) wordsMapping[curr] = 1;
    else wordsMapping[curr]++;
  }
  // Create items array // [[key1, value1], [key2, value2]...]
  let mostCommonWords = Object.keys(wordsMapping).map((key) => {
    return [key, wordsMapping[key]];
  });
  // Sort the array based on the second element
  mostCommonWords.sort((first, second) => second[1] - first[1]);
  mostCommonWords = mostCommonWords.slice(0, 5);
  return mostCommonWords;
}

export { analyzeText, getLanguageOfTheText };
