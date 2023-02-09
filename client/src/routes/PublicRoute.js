import styled from 'styled-components';

const Container = styled.div`
  /* width: var(--content-width); */
  width: 70vw;

  @media (max-width: 1229px) {
    width: 90vw;
  }
  /* padding-right: calc(var(--body-width) - var(--content-width) - var(--sidebar-width)); */
`;

const PublicRoute = ({ component: Component }) => {
  return <Container>{Component}</Container>;
};

export default PublicRoute;
