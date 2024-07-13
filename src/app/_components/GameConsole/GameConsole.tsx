import { cn } from "@/utils/misc";

interface IGameConsoleProps {
    className?: string;
    onStartButtonClick?: (() => void);
    onStopButtonClick?: (() => void);
    onNextButtonClick?: (() => void);
}

const GameConsole:React.FC<IGameConsoleProps> = (props) => {
    const {
        className,
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
    return (
        <div className={cn("w-full flex gap-x-5", className)} >
            <button className="p-3 bg-white" onClick={onStartButtonClick} >Start</button>
            <button className="p-3 bg-white" onClick={onStopButtonClick} >Stop</button>
            <button className="p-3 bg-white" onClick={onNextButtonClick} >Next</button>
        </div>
    )
}

export default GameConsole;