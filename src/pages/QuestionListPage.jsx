import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import QuestionList from '../components/QuestionList';
import logo from '../assets/logo.svg';
import darkLogo from '../assets/dark-logo.svg';
import AnswerButton from '../components/Buttons/SendQuestionButton';
import arrowDown from '../assets/arrow-down.svg';
import ThemeContext from '../contexts/ThemeContext';

function Navbar() {
  const mode = useContext(ThemeContext);

  return (
    <NavWrapper>
      <Nav>
        <Link to="/">
          <LogoImg
            src={mode === 'light' ? logo : darkLogo}
            alt="오픈마인드 로고"
          />
        </Link>
        <Link to="/">
          <AnswerButton>답변하러 가기</AnswerButton>
        </Link>
      </Nav>
    </NavWrapper>
  );
}

function QuestionBox() {
  return (
    <StyledBox>
      <Header>
        <ListTitle>누구에게 질문할까요?</ListTitle>
        <ButtonDiv>
          <DropdownButton type="button">
            <DropdownSpan>최신순</DropdownSpan>
            <ArrowDownIcon src={arrowDown} alt="화살표아이콘" />
          </DropdownButton>
        </ButtonDiv>
      </Header>
      <QuestionList />
    </StyledBox>
  );
}

function QuestionListPage() {
  return (
    <>
      <Navbar />
      <QuestionBox />
    </>
  );
}

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 120rem;
  padding: 0 3.2rem;
  margin: 0 auto;
  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    max-width: 50rem;
    padding: 0 2.4rem;
  }
`;

const NavWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 13rem;
  @media (min-width: 768px) {
    padding: 0 5rem;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LogoImg = styled.img`
  display: flex;
  width: 14.6rem;
  justify-content: center;
  align-items: center;
`;

/*
const AnswerButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2.4rem;
  gap: 0.8rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-brown-40);
  background-color: var(--color-brown-10);
  color: var(--color-brown-40);
  font-size: var(--font-body3);
  font-weight: var(--weight-regular);
  text-decoration: none;
  cursor: pointer;
`;

const ArrowRightIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;
*/

// 카드리스트 스타일

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
    width: 100%;
  }
`;

const ButtonDiv = styled.div`
  margin-bottom: 3rem;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    margin-bottom: 0;
  }
`;

const DropdownButton = styled.button`
  display: flex;
  width: 7.9rem;
  padding: 0.8rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  align-self: stretch;
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colorGrayScale40};
  background: ${({ theme }) => theme.colorGrayScale10};

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    font-size: var(--font-caption1);
  }
`;

const DropdownSpan = styled.span`
  color: ${({ theme }) => theme.colorGrayScale40};
  font-feature-settings:
    'clig' off,
    'liga' off;
  font-size: var(--font-caption1);
  font-style: normal;
  font-weight: var(--weight-medium);
  line-height: 1.8rem;
  white-space: nowrap;
`;

const ArrowDownIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

const ListTitle = styled.h1`
  color: ${({ theme }) => theme.colorGrayScale60};
  text-align: center;
  font-size: var(--font-h1);
  font-weight: var(--weight-regular);
  line-height: normal;

  @media screen and ((min-width: 375px)
  and (max-width: 767px)) {
    display: flex;
    font-size: var(--font-h3);
  }
`;

export default QuestionListPage;
