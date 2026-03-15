import type { IconProps } from "../../../lib/types";

export default function ArrowIcon({toggle}: IconProps){
    return( <svg filter="drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <g stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
  {toggle ? <polyline points="6 15 12 9 18 15" /> : <polyline points="6 9 12 15 18 9"/>}
  </g>
</svg>)
}