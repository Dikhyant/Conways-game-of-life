type TCoordinate = {
    x: number;
    y: number;
}

export const getCoordinateFromFlatIndex = (flatIndex: number, columns: number): TCoordinate => {
    return {
        x: Math.floor(flatIndex / columns),
        y: flatIndex % columns
    };
}

export const getMapOfAliveCellsForNextRound = (currentAliveCellsMap: Map<number,number>, rows:number, columns: number): Map<number, number> => {
    // keys are flat indices of alive cells
    // values are number of alive neighbours for each cell in this map
    const mapOfAliveCellsForNextRound:Map<number, number> = new Map();

    // key are flat indices of alive cells
    // values are number of alive neighbours for each cell in currentAliveCellsMap
    const mapOfDeadCellsWithAliveNeighboursInCurrentRound:Map<number, number> = new Map();

    currentAliveCellsMap.forEach((value, key) => {
        // here key is flat index
        if(value === 2 || value === 3) {
            mapOfAliveCellsForNextRound.set(key, 0);
        } 

        // lets find the dead neighbours to check for potential future living cells
        const {x, y} = getCoordinateFromFlatIndex(key, columns);
        let neighbourFlatIndex
        neighbourFlatIndex = key - 1 - columns; // top left neighbour
        if(
            x - 1 >= 0 && y - 1 >=0 &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key - columns; // top neighbour
        if(
            y - 1 >= 0 &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key + 1 - columns; // top right neighbour
        if(
            x + 1 < columns && y - 1 >= 0 &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key - 1; // left neighbour
        if(
            x - 1 >= 0 &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key + 1; // right neighbour
        if(
            x + 1 < columns &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key - 1 + columns; // bottom left neighbour
        if(
            x - 1 >= 0 && y + 1 < rows &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key + columns; // bottom neighbour
        if(
            y + 1 < rows &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }

        neighbourFlatIndex = key + 1 + columns; // bottom right neighbour
        if(
            x + 1 < columns && y + 1 < rows &&
            currentAliveCellsMap.get(neighbourFlatIndex) === undefined
        ) {
            mapOfDeadCellsWithAliveNeighboursInCurrentRound.set(
                neighbourFlatIndex,
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) !== undefined ?
                mapOfDeadCellsWithAliveNeighboursInCurrentRound.get(neighbourFlatIndex) as number + 1 : 1
            );
        }
    })

    mapOfDeadCellsWithAliveNeighboursInCurrentRound.forEach((value, key) => {
        if(value === 3) {
            mapOfAliveCellsForNextRound.set(key, 0);
        }
    })

    mapOfAliveCellsForNextRound.forEach((value, key) => {
        const {x, y} = getCoordinateFromFlatIndex(key, columns);
        let neighbourFlatIndex
        neighbourFlatIndex = key - 1 - columns; // top left neighbour
        if(
            x - 1 >= 0 && y - 1 >=0 &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key - columns; // top neighbour
        if(
            y - 1 >= 0 &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key + 1 - columns; // top right neighbour
        if(
            x + 1 < columns && y - 1 >= 0 &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key - 1; // left neighbour
        if(
            x - 1 >= 0 &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key + 1; // right neighbour
        if(
            x + 1 < columns &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key - 1 + columns; // bottom left neighbour
        if(
            x - 1 >= 0 && y + 1 < rows &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key + columns; // bottom neighbour
        if(
            y + 1 < rows &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }

        neighbourFlatIndex = key + 1 + columns; // bottom right neighbour
        if(
            x + 1 < columns && y + 1 < rows &&
            mapOfAliveCellsForNextRound.get(neighbourFlatIndex) !== undefined
        ) {
            mapOfAliveCellsForNextRound.set(key,mapOfAliveCellsForNextRound.get(key) as number + 1);
        }
    })

    return mapOfAliveCellsForNextRound;
}