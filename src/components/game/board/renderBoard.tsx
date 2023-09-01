import React, { useEffect, useState } from 'react'
import TokenBlue1 from '../tokens/bonusCookies/blue/tokenBlue1';

// Define the dimensions of your grid
const numRows = 18;
const numCols = 18;

// Define a Cell type to represent each cell on the grid
type Cell = {
    booleanValue: boolean;
    stringValue: string;
}

export default function RenderBoard                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          () {

    let content = <></>

    const [gridLoaded, setGridLoaded] = useState(false)
        
    // Initialize the grid as a 2D array with default values
    const [grid, setGrid] = useState<(Cell | null)[][]>(() => {
        // Initialize the grid here
        const numRows = 18;
        const numCols = 18;
        const initialGrid: (Cell | null)[][] = [];
      
        for (let row = 0; row < numRows; row++) {
          const rowArray: (Cell | null)[] = [];
          for (let col = 0; col < numCols; col++) {
            const cell: Cell = {
              booleanValue: false,
              stringValue: "X",
            };
            rowArray.push(cell);
          }
          initialGrid.push(rowArray);
        }
        setGridLoaded(true)      
        return initialGrid;
      })

    if (!gridLoaded) {
      content = <div>Grid not loaded.</div>
    }

    if (gridLoaded) {
      content = <>      
      <div className="col-span-10 overflow-auto flex justify-center bg-slate-500 py-8">
        <div className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] h-min">
        {grid.map((row, rowIndex) => (
            <div key={rowIndex.toString()} className="bg-slate-500 col-span-1">
              {row.map((cell, cellIndex) => {
                console.log({ cell });
                console.log(`cell (${rowIndex + 1}, ${cellIndex + 1})`);
                return <div key={cellIndex.toString()} className="text-white bg-emerald-500 border border-emerald-900 text-center w-[45px] h-[45px]">
                  {cell?.stringValue}
                </div>
              })}
            </div>
          ))}
          </div>
        </div>
        <TokenBlue1/>
      </>
    }

  return content
}
