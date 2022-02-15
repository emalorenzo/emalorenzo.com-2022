import styled from 'styled-components';

const Wrapper = styled.pre`
  overflow: auto;
  padding: 8px;
  background-color: #f5f5f5;
  border: 2px solid var(--primary-color);
`;

const Code = styled.code`
  font-family: 'Fira Code', monospace;
  color: black;
`;

export const CodeSnippet = ({ children }) => {
  return (
    <Wrapper>
      <Code>{children}</Code>
    </Wrapper>
  );
};
