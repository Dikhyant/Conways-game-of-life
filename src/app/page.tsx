"use client"
import Grid from "./_components/Grid/Grid";
import GameConsole from "./_components/GameConsole/GameConsole";
import { useEffect, useRef, useState } from "react";
import {getCoordinateFromFlatIndex, getMapOfAliveCellsForNextRound } from "@/utils/game";
import Patterns from "./_components/Patterns/Patterns";
import { patterns } from "@/db/patterns/pattern-manager";

type TPatternThumbnail = React.ComponentProps<typeof Patterns>["patternThumbnails"][0]

const patternThumbnails: TPatternThumbnail[] = patterns.map(item => ({id: item.id, image: item.image}))

export default function Home() {
  const [mapOfAliveCells, setMapOfAliveCells] = useState<Map<number, number>>(new Map());
  const [timeIntervalBetweenStates, setTimeIntervalBetweenStates] = useState<number>(100); //how long the app waits until updating the grid state
  const gameIntervalObject = useRef<NodeJS.Timeout>();
  const rows = 30;
  const columns = 30;

  useEffect(() => {
    console.log("mapOfAliveCells - ",mapOfAliveCells);
  }, [mapOfAliveCells]);

  useEffect(() => {
    if(!gameIntervalObject.current) return;
    stop();
    start();
  }, [timeIntervalBetweenStates]);

  const evalutateNextStep = () => {
    setMapOfAliveCells(prev => {
      return getMapOfAliveCellsForNextRound(
        prev,
        rows,
        columns
      )
    })
    
  }

  const start = () => {
    if(gameIntervalObject.current) return;
    evalutateNextStep();
    gameIntervalObject.current = setInterval(() => {
      evalutateNextStep();
    }, timeIntervalBetweenStates);
  }

  const stop = () => {
    if(gameIntervalObject.current) {
      clearInterval(gameIntervalObject.current);
    }

    gameIntervalObject.current = undefined;
  }

  const onStartButtonClick = () => {
    start();
  }

  const onStopButtonClick = () => {
    stop();
  }

  const onConsoleNextButtonClick = () => {
    evalutateNextStep();
  }

  const onResetButtonClick = () => {
    setMapOfAliveCells(new Map<number, number>());
  }

  const onTimeIntervalChange = (value: number) => {
    setTimeIntervalBetweenStates(value);
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

  const onPatternImageClick = (id: string) => {
    const patternObj = patterns.find(item => item.id === id);
    if(patternObj?.pattern) {
      setMapOfAliveCells(patternObj.pattern)
    }
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
          timeInterval={`${timeIntervalBetweenStates}`}
          onNextButtonClick={onConsoleNextButtonClick} 
          onStartButtonClick={onStartButtonClick}
          onStopButtonClick={onStopButtonClick}
          onTimeIntervalChange={onTimeIntervalChange}
          onResetButtonClick={onResetButtonClick}
      />
      <Patterns
          className="mt-6"
          patternThumbnails={patternThumbnails}
          onImageClick={onPatternImageClick}
      />
    </main>
  );
}
