import { motion } from "framer-motion";
import styled from "styled-components";
import Ring from "../../components/ring/Ring";
import { mockCircle } from "../../mock/circle";
import Content from "../content/Content";
import Nav from "../nav/Nav";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { portfolioData } from "../../mock/portfolio";

const MenuContainer = styled(motion.div)``;

const Main = (props: any) => {
  const [content, setContent] = useState([]);
  return (
    <>
      <MenuContainer>
        <Router>
          <Nav setContent={setContent} />
          <Routes>
            {portfolioData.map((topic: any) => (
              <Route
                path={topic.someKey}
                element={<Content data={content} />}
              ></Route>
            ))}
          </Routes>
        </Router>
      </MenuContainer>
    </>
  );
};

export default Main;
