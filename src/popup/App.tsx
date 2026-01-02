import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';
import Header from '@/components/Header';
import NavigationButton from '@/components/NavigateNextButton';
import UserIdInput from '@/components/UserIdInput';

export default function App() {
  return (
    <>
      <Header />
      <StyledContainer>
        {/* TODO: 내비게이션을 사용해서 메인 화면과 서브 화면을 분리 */}
        <UserIdInput />
        <Button variant='Default' fullWidth>
          Use my User ID
        </Button>
        <StyledHr />
        <NavigationButton />
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.main`
  margin: 1em;
  display: grid;
  grid-auto-flow: row;
  gap: 1em;
`;

const StyledHr = styled.hr`
  align-self: stretch;
  height: 1px;
  background-color: var(--charcoal-text4);
  outline: 0;
  border: 0;
  margin: 0;
`;
