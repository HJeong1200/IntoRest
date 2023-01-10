import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 1056px;
  height: 100px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 29px 31px;
  gap: 10px;
  background-color: lightgreen;
`;

const PostSubHeaderContainer = () => {
  return (
    <Container>
      <div>Index</div>
      <button type="button">Add</button>
    </Container>
  );
};

export default PostSubHeaderContainer;
