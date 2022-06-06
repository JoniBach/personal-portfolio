import { motion, useMotionValue } from "framer-motion";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import Line from "react-lineto";
import Button from "../button/Button";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../../Theme";
import icon from "../../utils/icon";

type StyledItemProps = {
  index?: any;
  counterRotation?: number;
  spacing?: number;
};

type StyledGroupProps = {
  initialRotation?: any;
};

const styleB = {
  delay: true,
  borderColor: theme.colors.pale,
  borderStyle: "dotted",
  borderWidth: 2,
  zIndex: -1,
};
const styleC = {
  delay: true,
  borderColor: "red",
  borderStyle: "dotted",
  borderWidth: 2,
  zIndex: -1,
};

const Center = styled(motion.div)`
  display: flex;
  align-self: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const MenuContainer = styled(motion.div)``;

const Item = styled(motion.div)<StyledItemProps>`
  display: flex;
  align-self: center;
  position: absolute;
  ${(props: any) => `transform: rotate(${props.counterRotation}deg);`}/* ${(
    props: any
  ) => `right: ${props.spacing}px;`} */
`;

const Container = styled(motion.div)<StyledGroupProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
`;

type ItemTypes = {
  label: any;
  parentLabel?: any;
  path?: any;
  index: number;
  sub?: number;
  total: number;
  active?: number;
  setActive?: any;
  itemKey?: any;
  expand?: boolean;
  openParent?: any;
};
type GroupTypes = {
  data: any;
  path?: any;
  parentLabel?: any;
  active?: number;
  setActive?: any;
  sub?: number;
  expand?: boolean;
  openParent?: any;
};
type CenterTypes = {
  expand: boolean;
  setExpand: (e: boolean) => void;
};
const handleRotation = (index: number, quantity: number) => {
  const total = 360;
  const base = total / quantity;
  const initial = index * base;
  const double = initial;
  const invert = -double;
  const group = { initial, counter: invert };
  return group;
};

const CenterItem = ({ expand, setExpand }: CenterTypes) => {
  return (
    <Center className="center-item">
      <Button
        text="black"
        fill="white"
        size={100}
        onClick={() => setExpand(!expand)}
        circle
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {expand ? "-" : "+"}
      </Button>
    </Center>
  );
};

const RingItem = ({
  label,
  parentLabel,
  index,
  total,
  setActive,
  active,
  sub,
  expand,
  itemKey,
  openParent,
  path,
}: ItemTypes) => {
  const newTotal = sub ? sub : total;
  const { counter } = handleRotation(index, total);
  const baseSpace = 20;
  const differential = (num: number) => {
    if (num > 9) {
      return 2.3;
    } else if (num > 18) {
      return 1.5;
    } else if (num > 27) {
      return 1;
    }
    return 1.5;
  };
  const newSpace = newTotal / differential(total);
  const spacing = baseSpace * newSpace;

  const navigate = useNavigate();
  const triggerLink = useCallback(
    (path: any) => navigate(`${path}`, { replace: true }),
    [navigate]
  );

  const handleClick = () => {
    if (!sub) {
      triggerLink(path);
    } else {
      triggerLink(`${active}?show=${path}`);
    }
  };
  const highlightButton = sub || (!sub && active === itemKey);
  const getSpacing = sub ? spacing * 2 : spacing;
  return (
    <>
      <Line
        from={`${sub ? "sub" : "base"}${index}`}
        to={`${sub ? "sub" : "base"}${index + 1 < total ? index + 1 : 0}`}
        toAnchor="center"
        {...styleB}
      />

      <Item
        spacing={getSpacing}
        animate={{ right: getSpacing }}
        counterRotation={counter}
        index={index}
        className={`${sub ? "sub" : "base"}${label}`}
      >
        <Button
          circle
          variant={!highlightButton ? "outline" : "fill"}
          text={!highlightButton ? "white" : "black"}
          onClick={() => handleClick()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {label}
        </Button>
      </Item>
    </>
  );
};

const RingGroup = ({
  data,
  parentLabel,
  path,
  sub,
  setActive,
  active,
  expand,
  openParent,
}: GroupTypes) => {
  const showOuter = sub;
  const selectedData = showOuter ? (active ? data : []) : data;
  return (
    <>
      {selectedData.map((props: any, index: number) => (
        <Container
          animate={{ rotate: [0, handleRotation(index, data.length).initial] }}
        >
          <RingItem
            expand={expand}
            setActive={setActive}
            active={active}
            total={data.length}
            itemKey={props.key}
            path={props.key}
            index={index}
            label={
              expand
                ? sub
                  ? props.label
                  : openParent
                  ? icon(props.icon, index.toString())
                  : props.label
                : !sub
                ? icon(props.icon, index.toString())
                : icon(props.icon, index.toString())
            }
            parentLabel={parentLabel}
            sub={sub}
          />
        </Container>
      ))}
    </>
  );
};

const mapForData = "someData";
const mapForLabel = "someLabel";
const mapForKey = "someKey";
const mapForIcon = "someIcon";

const Ring = (props: any) => {
  const { data } = props;
  const [mappedData, setMappedData] = useState<any>([]);
  // const [active, setActive] = useState<any>(null);
  const [subCat, setSubCat] = useState<any>(null);
  const active = props.active;
  const handleDataMap = (newData: any) => {
    const mapData = newData.map((d: any) => ({
      label: d[mapForLabel],
      key: d[mapForKey],
      icon: d[mapForIcon],
      data:
        d[mapForData] && d[mapForData].length > 0
          ? handleDataMap(d[mapForData])
          : [],
    }));
    const completedData = mapData;
    return completedData;
  };

  useEffect(() => {
    setMappedData(handleDataMap(data));
  }, []);
  const [expand, setExpand] = useState(false);
  const displayData =
    mappedData?.filter((d: any) => d?.key === active)[0]?.data || [];

  useEffect(() => {
    props.setContent(displayData);
  }, [displayData]);

  return (
    <>
      <MenuContainer>
        {/* {(active) && (
          <Line
            from={`base${active}`}
            to={`center-item`}
            toAnchor="center"
            {...styleC}
          />
        )} */}
        <Container>
          {mappedData.length === 0 ? (
            "loading"
          ) : (
            <>
              <RingGroup
                expand={expand}
                active={active}
                data={mappedData}
                setActive={setSubCat}
                openParent={active}
              />
              {active && (
                <RingGroup
                  data={displayData}
                  active={active}
                  sub={mappedData.length}
                  expand={expand}
                />
              )}
            </>
          )}
        </Container>
        <CenterItem expand={expand} setExpand={setExpand} />
      </MenuContainer>
    </>
  );
};

export default Ring;
