import styled from "styled-components";

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  background: #619bff;
  color: white;
  font-weight: bold;
  margin-right: 2rem;
`;

const FilterContainer = (props) => {
  let { showCloseBtn, onClose } = props;
  return (
    <>
      {props.children}
      {showCloseBtn && <CloseBtn onClick={onClose}>x</CloseBtn>}
    </>
  );
};

export default FilterContainer;
