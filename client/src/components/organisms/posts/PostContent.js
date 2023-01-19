import styled from 'styled-components';
// import { useEffect, useState } from 'react';
import PostContentViewer from '../../molecules/posts/PostContentViewer';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: calc(100%);
  height: fit-content;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 5vh;
`;

const PostSubHeaderContainer = () => {
  return (
    <Container>
      <PostContentViewer />
    </Container>
  );
};

export default PostSubHeaderContainer;
