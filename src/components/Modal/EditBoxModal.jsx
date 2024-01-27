import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useEditMode from '../hooks/useEditMode';
import deleteAnswer from '../../services/DeleteAnswer';
import postAnswer from '../../services/PostAnswer';
import patchAnswer from '../../services/PatchAnswer';
import useQuestionsAtom from '../hooks/useQuestions';

export default function EditBoxModal({
  isOpenModal,
  setIsOpenModal,
  questionId,
  answerId,
}) {
  const [questions, setQuestions, setQuestion] = useQuestionsAtom();
  console.log(questions, setQuestions);
  const [editModeId, setEditModeId] = useEditMode();
  const wrapperRef = useRef();
  const handleClickOutside = e => {
    if (
      wrapperRef &&
      !wrapperRef.current.contains(e.target) &&
      e.target.id !== 'kebab'
    ) {
      setIsOpenModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleEdit = () => {
    setEditModeId(questionId); // id를 넘겨주고
    console.log('editModeId: ', editModeId);
  };

  const handleDelete = async () => {
    // setEditModeId(null);
    alert('정말로 삭제하시겠습니까?');
    await deleteAnswer(answerId);
    setQuestion(null, questionId);
  };

  const handleReject = async () => {
    setEditModeId(null);
    if (answerId) {
      const result = await patchAnswer(answerId, {
        isRejected: 'true',
      });
      console.log(' patch거절: ', result);
      setQuestion(result, result.questionId);
    } else {
      const result = await postAnswer(questionId, {
        content: 'default',
        isRejected: 'true',
      });
      console.log('post거절: ', result);
      setQuestion(result, result.questionId);
    }
  };

  return (
    <EditBox ref={wrapperRef} value={isOpenModal}>
      <EditItem onClick={handleEdit}>수정하기</EditItem>
      <EditItem onClick={handleDelete}>삭제하기</EditItem>
      <EditItem onClick={handleReject}>거절하기</EditItem>
    </EditBox>
  );
}

const EditBox = styled.div`
  position: absolute;
  top: 26px;
  right: 0;
  display: flex;
  width: 85px;
  padding: 4px 0px;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorGrayScale30};
  background: ${({ theme }) => theme.colorGrayScale10};

  box-shadow: var(--shadow-1pt);

  overflow: hidden;
  cursor: pointer;
`;

const EditItem = styled.div`
  width: 100%;
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;

  font-size: var(--font-caption1);

  color: ${({ theme }) => theme.colorGrayScale50};

  &:hover {
    color: ${({ theme }) => theme.colorGrayScale60};
    background: ${({ theme }) => theme.colorGrayScale20};
  }

  &:active {
    color: ${({ theme }) => theme.colorBlue50};
    background: ${({ theme }) => theme.colorGrayScale10};
  }
`;