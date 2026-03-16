import { useMemo } from "react";
import { COLORS } from "../../lib/config";
import type { Todo } from "../../lib/types";

const interpolateColor = (col1:number[], col2:number[], factor:number)=>col1.map((c, i) =>
    Math.round(c + (col2[i] - c) * factor) );

type PercentProps = {
  arr: Todo[]
}

export default function Percent({ arr }:PercentProps) {
  const percent = useMemo(() => { 
    const total = arr?.length || 0;
    const done = arr?.filter((t) => t.done)?.length || 0;
    return total === 0 ? 100 : Math.round((done / total) * 100);
  }, [arr]);

  const borderColor = useMemo(() => {
    if (percent <= 0) return `rgb(${COLORS[0].join(",")})`;
    if (percent < 25)
      return `rgb(${interpolateColor(COLORS[0], COLORS[1], percent / 25).join(",")})`;
    if (percent < 50)
      return `rgb(${interpolateColor(COLORS[1], COLORS[2], (percent - 25) / 25).join(",")})`;
    if (percent < 75)
      return `rgb(${interpolateColor(COLORS[2], COLORS[3], (percent - 50) / 25).join(",")})`;
    if (percent < 100)
      return `rgb(${interpolateColor(COLORS[3], COLORS[4], (percent - 75) / 25).join(",")})`;
    return `rgb(${COLORS[4].join(",")})`;
  }, [percent]);

  const opacity = (arr?.length === 0 || !arr) ? 0.4 : 1;

  return (
    <span
  className="p-6 m-2 sm:p-9 rounded-full border-4 sm:border-8 flex items-center justify-center 
             w-12 h-12 sm:w-24 sm:h-24 
             shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-sm sm:text-xl sm:font-semibold font-bold
             shadow-text transition-all duration-300"
  style={{
    borderColor,
    opacity,
  }}
>
  {percent === null ? "..🔍" : `${percent}%`}
</span>

  );
}
