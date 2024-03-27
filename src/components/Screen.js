import React, { useReducer } from 'react';
import Navbar from './Navbar';
import './css/screen.css';
import './css/buttons.css';

const initialState = {
  text: '',
};

const actionTypes = {
  SET_TEXT: 'SET_TEXT',
  CONVERT_UPPERCASE: 'CONVERT_UPPERCASE',
  CONVERT_LOWERCASE: 'CONVERT_LOWERCASE',
  RESET: 'RESET',
  COPY_TO_CLIPBOARD: 'COPY_TO_CLIPBOARD',
  REMOVE_EXTRA_SPACES: 'REMOVE_EXTRA_SPACES',
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_TEXT:
      return { ...state, text: action.payload };
    case actionTypes.CONVERT_UPPERCASE:
      return { ...state, text: state.text.toUpperCase() };
    case actionTypes.CONVERT_LOWERCASE:
      return { ...state, text: state.text.toLowerCase() };
    case actionTypes.RESET:
      return { ...state, text: '' };
    case actionTypes.COPY_TO_CLIPBOARD:
      navigator.clipboard.writeText(state.text);
      return state;
    case actionTypes.REMOVE_EXTRA_SPACES:
      return { ...state, text: state.text.replace(/\s+/g, ' ') };
    default:
      return state;
  }
}

const calculateSummary = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const readingTime = Math.ceil(words / 200); // Assuming 200 words per minute for reading
  return { words, characters, readingTime };
};

const Screen = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { words, characters, readingTime } = calculateSummary(state.text);

  const handleTextChange = (e) => {
    dispatch({ type: actionTypes.SET_TEXT, payload: e.target.value });
  };

  return (
    <div className="main">
      <Navbar />
      <div className="text-div">
        <h2>TextUtils - Word Counter, Character Counter, Remove Extra Space</h2>
        <label htmlFor="">Enter Your Text Here:</label>
        <textarea
          cols="90"
          rows="10"
          value={state.text}
          onChange={handleTextChange}
        ></textarea>
        <div className="buttons">
          <button className="button-7" onClick={() => dispatch({ type: actionTypes.CONVERT_UPPERCASE })}>
            Convert to Uppercase
          </button>
          <button className="button-7" onClick={() => dispatch({ type: actionTypes.CONVERT_LOWERCASE })}>
            Convert to Lowercase
          </button>
          <button className="button-24" onClick={() => dispatch({ type: actionTypes.RESET })}>
            Reset
          </button>
          <button className="button-25" onClick={() => dispatch({ type: actionTypes.COPY_TO_CLIPBOARD })}>
            Copy to Clipboard
          </button>
          <button className="button-7" onClick={() => dispatch({ type: actionTypes.REMOVE_EXTRA_SPACES })}>
            Remove Extra Spaces
          </button>
        </div>
      </div>

      <div className="summary">
        <h2>Summary Of Your Text</h2>
        <p>Number of words: {words}</p>
        <p>Reading Time: {readingTime} minute(s)</p>
        <p>Number of characters: {characters}</p>
      </div>
      <div className="preview">
        {state.text}
      </div>
    </div>
  );
};

export default Screen;
