
import React, {useState, useEffect} from 'react';
import NitHubLogo from "./assets/nithub-logo.png"


const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];

export default function Memory() {
  const [board, setBoard] = useState(() => shuffle([...TILE_COLORS, ...TILE_COLORS]))
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedTiles, setMatchedTiles] = useState([]);

  useEffect(() => {
    if (selectedTiles.length < 2) return;

    if (board[selectedTiles[0]] === board[selectedTiles[1]]){
      setMatchedTiles([...matchedTiles, ...selectedTiles]);
      setSelectedTiles([])
    } else {
      const timeoutId = setTimeout(() => setSelectedTiles([]), 1000)
      return () => clearTimeout(timeoutId);
    }
  }, [selectedTiles])
  
  const selectTile = (index) => {
    if (selectedTiles.length >= 2 || selectedTiles.includes(index)) return;
    setSelectedTiles([...selectedTiles, index])
  }

  const restartGame = () => {
    setBoard(shuffle([...TILE_COLORS, ...TILE_COLORS]));
    setSelectedTiles([]);
    setMatchedTiles([]);
  };

  const didPlayerWin = matchedTiles.length === board.length;
  return (
    <article>
      <header className="head--nav"><img src={NitHubLogo} className="logo" alt="nithub-logo"/></header>
       <main className="main">
        <h1>{didPlayerWin ? 'You Win!' : 'Find All Pairs Of Colored Boxes'}</h1>
        <div className="board">
          {board.map((tileColor, i) => {
              const isTurnOver = selectedTiles.includes(i) || matchedTiles.includes(i)
        
              const className = isTurnOver ? `tile ${tileColor}` : 'tile';
              return <div key={i} className={className} onClick={() => selectTile(i)}/>
            })
          }
        </div>
        {didPlayerWin && <button className='my-[2em] mx-[2em]' onClick={restartGame}>Restart</button>}
    </main>  
    </article>
  );
}

/**
 * Returns the array shuffled into a random order.
 * Do not edit this function.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at i and randomIndex
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
  
}