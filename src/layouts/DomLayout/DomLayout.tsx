import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: auto;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`;

export const DomLayout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
