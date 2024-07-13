import HeartPatternImage from "~/public/assets/images/heart-pattern.png";
import heartPattern from "./heart.json";
import Pattern2Image from "~/public/assets/images/pattern-2.png";
import pattern2 from "./pattern-2.json";
import { StaticImageData } from "next/image";

export type TPattern = {
    id: string;
    image: StaticImageData;
    pattern: Map<number, number>;
}

export type TPatternCell = {
    key: number;
    value: number;
}

const getPatternMapFromPatternArray = (p: TPatternCell[]):Map<number, number> => {
    const map:Map<number, number> = new Map<number, number>();

    for(let i = 0; i < p.length; i++) {
        map.set(p[i].key, p[i].value);
    }
    return map;
}

export const patterns: TPattern[] = [
    {
        id: "1",
        image: HeartPatternImage,
        pattern: getPatternMapFromPatternArray(heartPattern as TPatternCell[])
    },
    {
        id: "2",
        image: Pattern2Image,
        pattern: getPatternMapFromPatternArray(pattern2 as TPatternCell[])
    },
]

