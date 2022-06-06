import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { lorem } from "../../mock/lorem";

const MenuContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* padding: 10px; */
  /* align-self: center; */
  background: #555;
  position: relative;
  min-height: 100vh;
  /* min-height: calc(100vh - 50px); */
  width: 100vw;
`;

const Item = styled(motion.div)`
  width: 100%;
  height: 100px;
  background: #777;
  margin: 10px;
`;

type ContentTypes = {
  label: "string";
  query?: any;
};

const ContentItem = ({ label, query }: ContentTypes) => {
  const myRef = useRef<any>(null);

  const executeScroll = () => myRef.current.scrollIntoView();

  // run this function from an event handler or an effect to execute scroll
  // useEffect(() => {
  //   executeScroll();
  // }, []);

  return <Item>{label}</Item>;
};

const Content = (props: any) => {
  const data = props.data;
  console.log(data);

  return (
    <>
      <MenuContainer>
        {data?.map((d: any) => (
          <ContentItem label={d.label} query={d.query}></ContentItem>
        ))}
      </MenuContainer>
    </>
  );
};

export default Content;
