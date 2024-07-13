"use client"
import Grid from "./_components/Grid/Grid";
import GameConsole from "./_components/GameConsole/GameConsole";
import { useEffect, useState } from "react";
import {getCoordinateFromFlatIndex, getMapOfAliveCellsForNextRound } from "@/utils/game";

export default function Home() {
  const [gridAliveState, setGridAliveState] = useState<boolean[][]>([]);
  const [mapOfAliveCells, setMapOfAliveCells] = useState<Map<number, number>>(new Map());
  const [aliveCells, setAliveCells] = useState<number[]>([]); // stores flat indices of alive cells
  const rows = 30
  const columns = 30

  useEffect(() => {
      const grid:boolean[][] = new Array(rows);
      for(let i = 0; i < columns; i++) {
          grid.push(Array.from({length: columns}, () => false))
      }

      console.log("grid - ", grid);

      setGridAliveState(grid);
  }, [rows, columns]);

  const evalutateNextStep = () => {
    setMapOfAliveCells(prev => {
      return getMapOfAliveCellsForNextRound(
        prev,
        rows,
        columns
      )
    })
    
  }

  const onConsoleNextButtonClick = () => {
    evalutateNextStep();
  }

  const onCellClick = (flatIndex: number) => {
    setMapOfAliveCells(prev => {
      const newState = new Map(prev)
      const isNewCellAdded = newState.get(flatIndex) === undefined ? true : false;

      if(isNewCellAdded) {
        newState.set(flatIndex, 0);
      } else {
        newState.delete(flatIndex);
      }

      const {x, y} = getCoordinateFromFlatIndex(flatIndex, columns);
        let neighbourFlatIndex
        neighbourFlatIndex = flatIndex - 1 - columns; // top left neighbour
        if(
            x - 1 >= 0 && y - 1 >=0 &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex - columns; // top neighbour
        if(
            y - 1 >= 0 &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex + 1 - columns; // top right neighbour
        if(
            x + 1 < columns && y - 1 >= 0 &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex - 1; // left neighbour
        if(
            x - 1 >= 0 &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex + 1; // right neighbour
        if(
            x + 1 < columns &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex - 1 + columns; // bottom left neighbour
        if(
            x - 1 >= 0 && y + 1 < rows &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex + columns; // bottom neighbour
        if(
            y + 1 < rows &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

        neighbourFlatIndex = flatIndex + 1 + columns; // bottom right neighbour
        if(
            x + 1 < columns && y + 1 < rows &&
            newState.get(neighbourFlatIndex) !== undefined
        ) {
            if(isNewCellAdded) {
              newState.set(flatIndex, newState.get(flatIndex) as number + 1);
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number + 1);
            } else {
              newState.set(neighbourFlatIndex, newState.get(neighbourFlatIndex) as number - 1);
            }
        }

      return newState;
    })
  }
  return (
    <main className="min-h-screen w-full bg-black" >
      <Grid
          mapOfAliveCells={mapOfAliveCells}
          rows={30}
          columns={30}
          onCellClick={onCellClick}
      />
      <GameConsole 
          className="mt-6"
          onNextButtonClick={onConsoleNextButtonClick} 
      />
    </main>
  );
}
