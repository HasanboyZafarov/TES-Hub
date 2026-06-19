import type { ReactNode } from "react";
import styled from "styled-components";
interface Props {
  children: ReactNode;
}

const StyledContainer = ({ children }: Props) => {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    padding: 0 10px;
  `;

  return <Container>{children}</Container>;
};

export default StyledContainer;
