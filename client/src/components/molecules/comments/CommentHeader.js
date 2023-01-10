import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: inherit;
  height: 30px;
  align-items: center;
  background-color: cadetblue;
`;

const CommentHeader = () => {
  return <Container>총 댓글</Container>;
};

export default CommentHeader;
