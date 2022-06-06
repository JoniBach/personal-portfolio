import { AiFillCamera, AiFillVideoCamera } from "react-icons/ai";
import { BsCodeSlash, BsMusicNoteBeamed, BsBookHalf } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { FaRocket } from "react-icons/fa";
import { MdSportsRugby } from "react-icons/md";
import { FaPaintBrush } from "react-icons/fa";

const Alt = (children: any) => {
  return <div>{children}</div>;
};

export const icon = (query: string, alt: string) => {
  switch (query) {
    case "camera":
      return <AiFillCamera />;
    case "video":
      return <AiFillVideoCamera />;
    case "code":
      return <BsCodeSlash />;
    case "music":
      return <BsMusicNoteBeamed />;
    case "book":
      return <BsBookHalf />;
    case "work":
      return <GrUserWorker />;
    case "paint":
      return <FaPaintBrush />;
    case "rocket":
      return <FaRocket />;
    case "rugby":
      return <MdSportsRugby />;
    default:
      return Alt(alt);
  }
};

export default icon;
