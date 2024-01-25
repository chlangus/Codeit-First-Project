import styled from 'styled-components';
import { useState } from 'react';
import thumbsUp from '../../assets/thumbs-up.svg';
import thumbsDown from '../../assets/thumbs-down.svg';
import clickedThumbsUp from '../../assets/clicked-thumbs-up.svg';
import clickedThumbsDown from '../../assets/clicked-thumbs-down.svg';
import storeReaction from '../../services/storeReaction';

export default function ReactionButton({
  // 사용하는 페이지에서 api 받아와서 id 및 reaction개수 전달받아야함
  id = 3634,
  likeCount = 0,
  dislikeCount = 0,
}) {
  const [reaction, setReaction] = useState({
    like: likeCount,
    dislike: dislikeCount,
    likeIcon: thumbsUp,
    dislikeIcon: thumbsDown,
  });

  const handleEmotion = async type => {
    const { like, dislike } = await storeReaction({ id, type }); //  questions/{id}/reaction 보내고 받아오면 그 like, dislike 값 받아와서 상태값 업데이트
    if (type === 'like') {
      setReaction({
        like,
        dislike,
        likeIcon: clickedThumbsUp,
        dislikeIcon: thumbsDown,
      });
    } else {
      setReaction({
        like,
        dislike,
        likeIcon: thumbsUp,
        dislikeIcon: clickedThumbsDown,
      });
    }
    setTimeout(() => {
      setReaction({
        like,
        dislike,
        likeIcon: thumbsUp,
        dislikeIcon: thumbsDown,
      });
    }, [400]);
  };

  return (
    <S.ReactionBox>
      <S.LikeBox
        onClick={() => {
          handleEmotion('like');
        }}
      >
        <img src={reaction.likeIcon} alt="thumbs-up" />
        <span>좋아요</span>
        <span>{reaction.like}</span>
      </S.LikeBox>
      <S.LikeBox
        onClick={() => {
          handleEmotion('dislike');
        }}
      >
        <img src={reaction.dislikeIcon} alt="thumbs-down" />
        <span>싫어요</span>
        <span>{reaction.dislike}</span>
      </S.LikeBox>
    </S.ReactionBox>
  );
}

const ReactionBox = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 3.2rem;
`;

const LikeBox = styled.span`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colorGrayScale40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: var(--font-caption1);
  font-style: normal;
  font-weight: var(--weight-medium);
  line-height: 1.8rem; /* 128.571% */
`;

const S = {
  ReactionBox,
  LikeBox,
};
