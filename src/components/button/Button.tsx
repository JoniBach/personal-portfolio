import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

type ButtonProps = {
  children?: any;
  circle?: boolean;
  onClick?: any;
  size?: number;
  variant?: string;
  fill?: string;
  text?: string;
  whileHover?: any;
  whileTap?: any;
};

const ButtonStyled = styled(motion.button)<ButtonProps>`
  font-family: ${(props: any) => props.theme.fonts[0]};
  background: ${({ theme: { colors }, fill, variant }) =>
    variant === "outline" ? colors.none : fill ? colors[fill] : colors.white};
  color: ${({ theme: { colors }, text, variant }) =>
    text ? colors[text] : colors.black};

  ${(props: any) =>
    props.circle
      ? "border-radius: 100%;"
      : ` border-radius: ${props.theme.spacing.s};`}
  border:  ${({ theme: { colors }, text }) =>
    `1px solid ${text ? colors[text] : colors.none}`};
  padding: ${({ theme: { spacing } }) => spacing.m};
  margin: ${({ theme: { spacing } }) => spacing.s};
  box-shadow: ${({ theme: { shadow } }) => `${shadow.close}`};
  cursor: pointer;
  text-transform: uppercase;
  ${(props: any) =>
    props.size
      ? `
  width: ${props.size}px;
  height: ${props.size}px;
  `
      : `
    width: 50px;
  height: 50px;
  `};
`;

const Button = ({
  fill,
  variant,
  size,
  circle,
  children,
  onClick,
  text,
  whileHover,
  whileTap,
}: ButtonProps) => {
  return (
    <ButtonStyled
      fill={fill}
      text={text}
      variant={variant}
      size={size}
      onClick={onClick}
      circle={circle}
      whileHover={whileHover}
      whileTap={whileTap}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
