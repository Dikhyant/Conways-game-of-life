import { cn } from "@/utils/misc";
import { ChangeEvent } from "react";

interface IGameConsoleProps {
    className?: string;
    timeInterval: string;
    onStartButtonClick?: (() => void);
    onStopButtonClick?: (() => void);
    onNextButtonClick?: (() => void);
    onResetButtonClick?: (() => void);
    onTimeIntervalChange?: ((value: number) => void);
}

const GameConsole:React.FC<IGameConsoleProps> = (props) => {
    const {
        className,
        timeInterval,
    } = props;

    const onStartButtonClick = () => {
        if(props.onStartButtonClick instanceof Function) {
            props.onStartButtonClick();
        }
    }

    const onStopButtonClick = () => {
        if(props.onStopButtonClick instanceof Function) {
            props.onStopButtonClick();
        }
    }

    const onNextButtonClick = () => {
        if(props.onNextButtonClick instanceof Function) {
            props.onNextButtonClick();
        }
    }

    const onResetButtonClick = () => {
        if(props.onResetButtonClick instanceof Function) {
            props.onResetButtonClick();
        }
    }

    const onTimeIntervalChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("value - ",event.target.value);
        if(props.onTimeIntervalChange instanceof Function && props.onTimeIntervalChange.length === 1) {
            props.onTimeIntervalChange(parseInt(event.target.value));
        }
    }
    return (
        <div className={cn("w-full flex gap-x-5", className)} >
            <button className="p-3 bg-white" onClick={onStartButtonClick} >Start</button>
            <button className="p-3 bg-white" onClick={onStopButtonClick} >Stop</button>
            <button className="p-3 bg-white" onClick={onNextButtonClick} >Next</button>
            <button className="p-3 bg-white" onClick={onResetButtonClick} >Reset</button>
            <div>
                <label className="text-white block" >Time interval</label>
                <input type="range" min={100} max={1000} value={timeInterval} onChange={onTimeIntervalChange} />
            </div>
        </div>
    )
}

export default GameConsole;