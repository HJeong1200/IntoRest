import styled from 'styled-components';
import { LabelListTitle, ParagraphMedium } from '../../../styles/typo';
import { UserInfoSmall } from '../UserInfo';
import { TextButton } from '../../atoms/Buttons';
import { PARAGRAPH, TITLE } from '../../../constants/Paragraph';
import useGetPost from '../../../hooks/useGetPost';

const Container = styled.div`
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  border: ${props => (props.selected ? '2px solid var(--blue-400)' : '2px solid #333333')};
  box-shadow: ${props => props.boxShadow || 'none'};
`;

const InfoLayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 18px 20px;
  width: fit-content;
  height: fit-content;

  background: ${props => (props.selected ? 'var(--orange-400)' : '#efefef')};
  color: ${props => (props.selected ? 'var(--blue-400)' : '')};

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;

const ContextLayer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
  gap: 10px;
  width: fit-content;
  height: fit-content;

  /* Inside auto layout */

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  gap: 20px;

  width: fit-content;
  height: fit-content;
`;
const Title = styled.div`
  width: ${props => props.width || '534px'};
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;

  ${LabelListTitle}
`;
const Paragraph = styled.div`
  width: ${props => props.width || '534px'};
  height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;

  ${ParagraphMedium}
`;

const ImageLayer = styled.img`
  width: 280px;
  height: 180px;

  background: var(--gray-800);
  display: block;
  object-fit: cover;
`;

const Layer = styled.div`
  cursor: pointer;
  &:hover {
    color: var(--blue-600);
  }
`;

/**
 * 쇼케이스에서 사용하는 이미지 썸네일 molecules
 * @param {string|number} boxShadow - 전체컨테이너의 그림자 효과
 * @param {string} width - text의 길이
 * @returns {JSX.Element} - PostList 개별 항목을 나타내는 컴포넌트
 */
const PostCard = ({ boxShadow, width, postId, handleClick, selected }) => {
  // 현재는postId와 관계없이 PostDummy에 있는 데이터를 가져옴
  const { post, isLoading, isLoadingError } = useGetPost(postId);

  // isLoading, isLoadingError state에 따라 컴포넌트 변경 예정
  // 나중에 Title,Paragraph조건문을 제거했을 때 렌더링 속도가 어떻게 변하는지 확인해봐야함
  // currentPost 일때 시각적으로 달라지는 부분이 필요할듯

  console.log(isLoading, isLoadingError);
  return (
    <Container boxShadow={boxShadow} selected={selected}>
      <InfoLayer selected={selected}>
        <Layer onClick={handleClick}>
          <Title width={width}>{post.title || TITLE}</Title>
          <Paragraph width={width}>{post.Paragraph || PARAGRAPH}</Paragraph>
        </Layer>
        <ContextLayer>
          <UserBox>
            <UserInfoSmall name="UserName" image="https://unsplash.it/1920/1080/?random" />
          </UserBox>
          <TextButton width="30px"> text</TextButton>
          <TextButton width="30px"> text</TextButton>
        </ContextLayer>
      </InfoLayer>
      <ImageLayer />
    </Container>
  );
};

/**
 * 쇼케이스에서 사용하는 이미지 썸네일 molecules
 * @param {string|number} boxShadow - 전체컨테이너의 그림자 효과
 * @param {string} width - text의 길이
 * @returns {JSX.Element} - PostListStack을 나타내는 컴포넌트
 */
const PostListStack = ({ boxShadow = 'var(--boxShadow-stack)', width = '278px', post }) => {
  const { title, content, writer } = post;

  return (
    <Container boxShadow={boxShadow}>
      <InfoLayer>
        <Title width={width}>{title} </Title>
        <Paragraph width={width}>{content}</Paragraph>
        <ContextLayer>
          <UserBox>
            <UserInfoSmall name={writer.nickname} image={writer.profileUrl} />
          </UserBox>
        </ContextLayer>
      </InfoLayer>
      <ImageLayer />
    </Container>
  );
};
export { PostCard, PostListStack };
