import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  BsArrowDown,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
} from "react-icons/bs";
import { FaAngleDoubleUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Ring from "../../components/ring/Ring";
import { mockCircle } from "../../mock/circle";
import { portfolioData } from "../../mock/portfolio";

const MenuContainer = styled(motion.div)`
  /* display: flex; */
  /* align-self: center; */
  background: #222;
  /* position: relative; */
  height: 100vh;
  width: 100vw;

  .sticky-wrapper {
    position: absolute;
    bottom: 0;
  }
  .sticky-inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .none {
    position: relative;
  }
`;

const Bar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #222;
  width: 100vw;
  color: white;
`;

const NavContent = (props: any) => {
  if (props.displayName) {
    return (
      <>
        {props.stuck && <BsChevronDoubleUp />}

        {props.displayName}
        {!props.stuck && <BsChevronDoubleDown />}
      </>
    );
  }

  return <>welcome</>;
};

const Nav = (props: any) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<any>(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);
  const sampleLocation = useLocation();
  const pathname = sampleLocation.pathname;
  const displayNames = pathname
    .substring(1)
    .split("/")
    .filter((d: any) => d !== "");
  const displayName = displayNames[0];

  return (
    <>
      <MenuContainer>
        <Ring
          setContent={props.setContent}
          data={portfolioData}
          active={displayName}
        />
        <div className={`sticky-wrapper`} ref={ref}>
          <div className={isSticky ? "sticky-inner" : "none"}>
            <Bar>
              <NavContent displayName={displayName} stuck={isSticky} />
            </Bar>
          </div>
        </div>
      </MenuContainer>
    </>
  );
};

export default Nav;
