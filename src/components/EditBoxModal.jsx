import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import deleteAnswer from '../services/DeleteAnswer';

export default function EditBoxModal({
  isOpenModal,
  setIsOpenModal,
  setEditMode,
}) {
  // const [answer, setAnswer] = useState('');

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
    console.log('수정창 열림');
    setEditMode(true);
  };
  const handleDelete = async () => {
    alert('정말로 삭제하시겠습니까?');
    await deleteAnswer(3655);
  };

  return (
    <EditBox ref={wrapperRef} value={isOpenModal}>
      <EditItem onClick={handleEdit}>수정하기</EditItem>
      <EditItem onClick={handleDelete}>삭제하기</EditItem>
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
  border: 1px solid var(--color-grayscale-30);
  background: var(--color-grayscale-10);

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

  color: var(--color-grayscale-50);

  &:hover {
    color: var(--color-grayscale-60);
    background: var(--color-grayscale-20);
  }

  &:active {
    color: var(--color-blue-50);
    background: var(--color-grayscale-10);
  }
`;
