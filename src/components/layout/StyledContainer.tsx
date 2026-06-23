import type { ReactNode } from "react";
import styled from "styled-components";
interface Props {
  children: ReactNode;
  className?: string;
}

const StyledContainer = ({ children, className }: Props) => {
  const Container = styled.div`
    margin: 0 auto;
    max-width: 1440px;
    height: auto;
    padding: 0 1rem;
  `;

  return <Container className={className}>{children}</Container>;
};

export default StyledContainer;
