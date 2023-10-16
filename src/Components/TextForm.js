import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const Speak = (itemToSpeak) => {
    let message = new SpeechSynthesisUtterance();
    message.text = itemToSpeak;
    window.speechSynthesis.speak(message);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleEmptyText = () => {
    if (!text) {
      Speak("Please Enter Text");
      return true;
    }
    return false;
  };

  const convertToUpperCase = () => {
    if (handleEmptyText()) return;
    setText(text.toUpperCase());
  };

  const convertToLowerCase = () => {
    if (handleEmptyText()) return;
    setText(text.toLowerCase());
  };

  const clearText = () => {
    if (handleEmptyText()) return;
    setText("");
  };

  const handleRemoveSymbols = () => {
    if (handleEmptyText()) return;
    const regex = /[0-9/A-Z/a-z/ /]/g;
    const letters = text.match(regex);
    const newText = letters.join("");
    setText(newText);
  };

  const extractNumbers = () => {
    if (handleEmptyText()) return;
    const regex = /[0-9/ /]/g;
    const digits = text.match(regex);
    const newText = digits.join("").replace(/\s+/g, "");
    setText(newText);
  };

  const removeWhitespaces = () => {
    const newText = text.replace(/\s+/g, "");
    setText(newText);
  };

  const reverseText = () => {
    if (handleEmptyText()) return;
    const newText = text.split("").reverse().join("");
    setText(newText);
  };

  const copyToClipboard = () => {
    if (handleEmptyText()) return;
    navigator.clipboard.writeText(text).then(() => Speak("Copied"));
  };

  const countWords = () => {
    if (handleEmptyText()) return;
    const words = text.split(/\s+/).filter(word => word.trim() !== "");
    alert(`Word count: ${words.length}`);
  };

  const countCharactersWithoutSpaces = () => {
    if (handleEmptyText()) return;
    const newText = text.replace(/\s+/g, "");
    alert(`Character count (without spaces): ${newText.length}`);
  };

  const sentenceCase = () => {
    if (handleEmptyText()) return;
    const newText = text
      .toLowerCase()
      .split(". ")
      .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
      .join(". ");
    setText(newText);
  };

  return (
    <>
      <div>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control shadow-lg p-3 mb-5 bg-body rounded border border-dark text-primary"
            id="exampleFormControlTextarea1"
            value={text}
            placeholder="Enter your text"
            onChange={handleOnChange}
            rows="4"
          ></textarea>
        </div>
        <button className="btn btn-outline-success mx-2 " onClick={convertToUpperCase}>Convert to Uppercase</button>
        <button className="btn btn-outline-success mx-2 " onClick={convertToLowerCase}>Convert to Lowercase</button>
        <button className="btn btn-outline-success mx-2 " onClick={handleRemoveSymbols}>Remove Symbols</button>
        <button className="btn btn-outline-success mx-2 " onClick={extractNumbers}>Extract Number</button>
        <button className="btn btn-outline-success mx-2 " onClick={removeWhitespaces}>Remove Whitespaces</button>
        <button className="btn btn-outline-success mx-2 " onClick={reverseText}>Reverse</button>
        <button className="btn btn-outline-success mx-2 " onClick={() => Speak(text)}>Speak</button>
        <button className="btn btn-outline-success mx-2 my-2 " onClick={copyToClipboard}>Copy to clipboard</button>
        <button className="btn btn-outline-success mx-2 my-2 " onClick={clearText}>Clear</button>
        <button className="btn btn-outline-success mx-2 " onClick={countWords}>Count Words</button>
        <button className="btn btn-outline-success mx-2 " onClick={countCharactersWithoutSpaces}>Count Characters (without spaces)</button>
        <button className="btn btn-outline-success mx-2 " onClick={sentenceCase}>Sentence Case</button>
      </div>
      <div className="container my-4">
        <h1>Your Text Summary</h1>
        <p>{(text.split(/\s+/).filter(word => word.trim() !== "").length)} words and {text.length} characters</p>
        <p>Estimated time to read: {((text.split(" ").length) / 200).toFixed(1)} min</p>
      </div>
    </>
  );
}
