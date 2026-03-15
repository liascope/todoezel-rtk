import { useState } from "react";

import ModalContent from "../ui/ModalContent";

export default function Header(){
  const [open, setOpen] = useState(false)
 const [bgLoaded, setBgLoaded] = useState(false);
    return <><div
  onClick={() => setOpen(true)}
  className="w-full h-18 sm:h-28 flex items-center px-4 cursor-pointer"
>
  <div className="relative w-full h-full">
    <img
      src="/logo.png"
      alt="Logo"
      className="w-full h-full object-contain"
    />
  </div>
</div>
{/* BackgroundImage */}
 <div className={`fixed inset-0 w-screen h-screen z-[-1] transition-opacity duration-500 ${
          bgLoaded ? "opacity-100" : "opacity-60 bg-stone-600/80 backdrop-blur-3xl"
        }`}>
      <img src="/todoezelbg.jpg" alt="Background" className="w-full h-screen object-cover object-center invert-20 " onLoad={() => setBgLoaded(true)}/>
    </div>
{open && <ModalContent onClose={() => setOpen(false)} />}</>
}
 