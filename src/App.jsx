import React, { useRef, useState, useEffect } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Square from './components/Square/index'
import { ButtonGroup } from 'react-bootstrap'

import {
  exportComponentAsJPEG,
  exportComponentAsPNG
} from "react-component-export-image";

const COLORS = ['red', 'purple', 'green', 'blue', 'yellow', 'orange', 'white', 'black', 'papayawhip', 'pink', 'peru']

function App() {
  const componentRef = useRef();
  const [board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(0);
  const [colorPicker, setColorPicker] = useState([]);
  const [currentColor, setCurrentColor] = useState('white');
  const [currentPosition, setCurrentPosition] = useState(0)
  const [hasBeenClicked, setHasBeenClicked] = useState(false)

  //Every time the position changes or the hasBeenClicked changes, it updates the array of Squares and prints it modified
  useEffect(() => {
    const updatedBoard = []
    for (let i = 0; i < boardSize * boardSize; i++) {
      if (currentPosition === i) {
        updatedBoard.push(<Square key={i} position={i} size={boardSize} color={currentColor} onClick={setSquarePosition} />)
      } else {
        updatedBoard.push(board[i])
      }
    }
    setBoard(updatedBoard);

  }, [currentPosition, hasBeenClicked])

  //initialize the color picker state array and the board
  useEffect(() => {
    handleBoardSize(8);
    setColorPicker(COLORS.map((color, idx) => (<div className="cursor-pointer"><Square key={idx} size={0} color={color} onClick={getColorFromPicker} /></div>)))
  }, [])

  /**
   * Creates the array of Squares in order to display the board, given a size
   */
  const handleBoardSize = size => {
    setBoard(Array.from(Array(size * size)).map((el, idx) => (<Square key={idx} position={idx} size={size} color={'white'} onClick={setSquarePosition} />)))
    setBoardSize(size);
  }

  /**
   * Sets the current color clicked on the color picker into a state
   */
  function getColorFromPicker(color) {
    setCurrentColor(color);
  }

  /**
   * Gets the position of the clicked Square and stores it, it changes the hasBeenClicked state, so in case the same square is clicked again, 
   * the useEffect is going to update the array anyway
   */
  function setSquarePosition(color, position) {
    setCurrentPosition(position);
    setHasBeenClicked(!hasBeenClicked);
  }


  return (
    <React.Fragment>
      <h1 className="mainTitle">Pixel Art</h1>
      <div className="ctn-sizeButtons">
        <h4>Board Size</h4>
        <ButtonGroup aria-label="Size of the board">
          <div className="sizeButtons cursor-pointer" onClick={() => handleBoardSize(8)}>8x8</div>
          <div className="sizeButtons cursor-pointer" onClick={() => handleBoardSize(12)}>12x12</div>
          <div className="sizeButtons cursor-pointer" onClick={() => handleBoardSize(16)}>16x16</div>
          <div className="sizeButtons cursor-pointer" onClick={() => handleBoardSize(32)}>32x32</div>
        </ButtonGroup>
      </div>
      <div className="ctn-colorPicker">
        {colorPicker}
      </div>
      <div ref={componentRef}>
        <div className={`board-${boardSize}`} style={{ marginBottom: '10px' }}>
        {board}

        </div>
        <p style={{display: 'hidden'}}> </p> {/* The board appeared without the bottom border for some reason when exported to image, this is to prevent it */}
      </div>

      <div className="ctn-exportButton">
        <div className="exportButton cursor-pointer" onClick={() => exportComponentAsJPEG(componentRef)}>
          Export As JPEG
        </div>
        <div className="exportButton cursor-pointer" onClick={() => exportComponentAsPNG(componentRef)}>
          Export As PNG
        </div>
      </div>

    </React.Fragment>
  );

}

export default App
