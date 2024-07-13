import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge";

interface ICellProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isAlive?: boolean;
}

const Cell:React.FC<ICellProps> = (props) => {
    const {
        isAlive,
        className,
    } = props;
    return (
        <button {...props} className={twMerge("w-2 h-2 bg-slate-800",isAlive && "bg-yellow-400", className)} ></button>
    )
}

export default Cell;