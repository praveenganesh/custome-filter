import styled from "styled-components";

const StdButton = styled.button`
  border: 1px solid #619bff;
  background: ${(props) => props.background || "none"};
  margin: 0 2px;
  color: ${(props) => props.color || "#000"};
  cursor: pointer;
`;

const Button = ({ children, variant = "outlined", onClick }) => {
  let background;
  let color;
  if (variant === "contained") {
    background = "#619bff";
    color = "#fff";
  } else if (variant === "outlined") {
    background = "#fff";
    color = "#000";
  }
  return (
    <StdButton background={background} color={color} onClick={onClick}>
      {children}
    </StdButton>
  );
};

export default Button;
