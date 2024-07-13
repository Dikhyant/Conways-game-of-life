"use client"
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import Cell from "../Cell/Cell";

interface IGridProps {
    mapOfAliveCells: Map<number, number>;
    rows: number;
    columns: number;
    onCellClick?: ((flatIndex: number) => void);
}

const Grid:React.FC<IGridProps> = (props) => {
    const {
        rows,
        columns,
        mapOfAliveCells,
    } = props;

    const onCellClick = (flatIndex: number) => {
        if(props.onCellClick instanceof Function && props.onCellClick.length === 1) {
            props.onCellClick(flatIndex);
        }
    }

    return (
        <div className={twMerge("grid gap-1 w-full")} 

            style={{
                gridTemplateRows: `repeat(${rows}, 20px)`,
                gridTemplateColumns: `repeat(${columns}, 20px)`
            }}
        >
            {
                Array.from({length: rows}, () => Array.from({length: columns})).flat().map((item, index) => {
                    const isAlive = mapOfAliveCells.get(index) !== undefined;
                    return (
                        <Cell
                            key={index}
                            isAlive={isAlive}
                            className="w-full h-full"
                            onClick={() => {onCellClick(index)}}
                        />
                    )
                })
                
            }
        </div>
    )
}

export default Grid;