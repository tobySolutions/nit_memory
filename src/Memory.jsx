
import React, {useState, useEffect} from 'react';

const TILE_COLORS = ['red', 'green', 'blue', 'yellow'];
const nitHubLogo = "https://media-exp1.licdn.com/dms/image/D4D0BAQECaofB-HkiwQ/company-logo_200_200/0/1665340228010?e=1674691200&v=beta&t=U8UDL3jN9mTpomBqOFystUHrHF1keU4Y2MpE7NUDReE";

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
      <>
        <header className="head--nav"><img src={nitHubLogo} className="logo" alt="nithub-logo"/></header>
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
      {didPlayerWin && <button onClick={restartGame}>Restart</button>}
    </main>  
    </>
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