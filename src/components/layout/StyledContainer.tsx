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
    /* Side padding only: a shorthand here would override any py-* class
       callers pass through className. */
    padding-left: 1rem;
    padding-right: 1rem;
  `;

  return <Container className={className}>{children}</Container>;
};

export default StyledContainer;
