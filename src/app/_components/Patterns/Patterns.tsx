import { cn } from "@/utils/misc";
import Image, { StaticImageData } from "next/image";

interface IPatternsProps {
    patternThumbnails: TPatternThumbnail[];
    className?: string;
    onImageClick?: ((id: string) => void);
}

type TPatternThumbnail = {
    id: string;
    image: StaticImageData;
}

const Patterns:React.FC<IPatternsProps> = (props) => {
    const {
        patternThumbnails,
        className
    } = props;

    const onImageClick = (id: string) => {
        if(props.onImageClick instanceof Function && props.onImageClick.length === 1) {
            props.onImageClick(id);
        }
    }
    return (
        <div className={cn("flex flex-wrap w-full gap-2", className)} >
            {
                patternThumbnails.map(item => {
                    return (
                        <button
                            key={item.id}
                            onClick={() => onImageClick(item.id)}
                        >
                            <Image
                                src={item.image}
                                alt="Pattern thumbnail"
                                width={100}
                                height={100}
                            />
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Patterns;