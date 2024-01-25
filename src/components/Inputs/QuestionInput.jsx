import { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetchSubject from '../../services/FetchSubject';
import fetchQuestion from '../../services/FetchQuestion';

export default function QuestionInput({ subjectId, setModalOpen }) {
  const [question, setQuestion] = useState('');
  const [subjectData, setSubjectData] = useState({ imageSource: '', name: '' });

  // 텍스트 에어리어 값이 변경될 때마다 호출되는 함수
  // 현재 값으로 question 상태를 업데이트
  const handleQuestionChange = e => {
    setQuestion(e.target.value);
  };

  // 질문을 보내는 역할
  const handleSendQuestion = async () => {
    try {
      console.log('질문 전송 중:', question);

      // subject ID 받아오기
      const data = await fetchQuestion(subjectId);
      console.log('질문 데이터:', data);

      // mapping해서 subjectId를 가져와야할듯?
      const extractedSubjectId = data?.results?.[0]?.subjectId;
      console.log('추출된 subjectId:', extractedSubjectId);

      const response = await fetch(
        `https://openmind-api.vercel.app/3-2/subjects/${extractedSubjectId}/questions/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: question }),
        },
      );

      const responseData = await response.json();
      console.log('responseData: ', responseData);
      // 성공적으로 response를 받으면 모달 창을 닫음
      setModalOpen(false);
    } catch (error) {
      console.error('질문 등록 실패 : ', error);
    }
  };

  // 닉네임, 프로필 사진 받아오기
  useEffect(() => {
    fetchSubject(subjectId).then(data => {
      if (data) {
        setSubjectData(data);
      }
    });
  }, [subjectId, setSubjectData]);

  return (
    <>
      <ModalSendTo>
        <div className="to">To.</div>
        <div>
          <img src={subjectData.imageSource} alt="프로필 이미지" />
        </div>
        <div className="nickname">{subjectData.name}</div>
      </ModalSendTo>
      <ModalInput>
        <div>
          <textarea
            placeholder="질문을 입력해주세요"
            value={question}
            onChange={handleQuestionChange}
          />
          -
        </div>
        <Button
          onClick={question ? handleSendQuestion : null}
          style={{
            cursor: question ? 'pointer' : 'default',
            background: question
              ? 'var(--Brown-30, #C7BBB5)'
              : ' var(--Brown-10, #F5F1EE)',
            color: question
              ? 'var(--Brown-10, #F5F1EE)'
              : 'var(--Brown-30, #C7BBB5)',
          }}
        >
          질문 보내기
        </Button>
      </ModalInput>
    </>
  );
}
const ModalSendTo = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin: 1.5rem auto;
  align-self: stretch;

  .to {
    color: ${({ theme }) => theme.colorGrayScale60};
    font-size: 18px;
    font-family: Actor;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  img {
    display: flex;
    width: 2.8rem;
    height: 2.8rem;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .nickname {
    color: ${({ theme }) => theme.colorGrayScale60};

    font-feature-settings:
      'clig' off,
      'liga' off;
    font-family: Pretendard;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.2rem; /* 137.5% */ /* 137.5% */
  }
`;

const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  textarea {
    display: flex;
    width: 53.2rem;
    height: 18rem;
    padding: 1.6rem;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    gap: 1rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colorGrayScale20};
    font-family: Pretendard;
    font-size: 1.52rem;
    font-style: normal;
    font-weight: 400;
    border: none;
    resize: none;
    @media (max-width: 767px) {
      display: flex;
      height: 35rem;
      width: 27rem;
      padding: 1.6rem;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      align-self: stretch;
    }
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  padding: 1.2rem 2.4rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem;
  color: ${({ theme }) => theme.colorGrayScale10};
  font-family: Pretendard;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.2rem; /* 137.5% */
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colorBrown30};
  margin-top: 0.8rem;
  height: 5rem;
  border: none;
`;
