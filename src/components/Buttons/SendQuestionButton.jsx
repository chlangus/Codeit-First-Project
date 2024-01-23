import styled from 'styled-components';
import arrowRight from '../../assets/arrow-right.svg';

export default function SendQuestionButton({ children }) {
  return (
    <StyledButton>
      {children}
      <Img src={arrowRight} alt="arrowRight" />
    </StyledButton>
  );
}

export const StyledButton = styled.button`
  display: inline-flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colorBrown40};
  background: ${({ theme }) => theme.colorBrown10};
  color: ${({ theme }) => theme.colorBrown40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 137.5% */

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 18px; /* 128.571% */
  }
`;

const Img = styled.img`
  width: 18px;
  height: 18px;
`;
