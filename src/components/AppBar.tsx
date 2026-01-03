import { IconButton } from '@charcoal-ui/react';
import styled from 'styled-components';
import logo from '/logo.png?url';

export default function AppBar() {
  const handleCloseClick = () => window.close();
  return (
    <StyledAppBar>
      <StyledIcon>
        <img src={logo} alt='' width={20} />
      </StyledIcon>
      <span>Bookmark Helper</span>
      <div className='flex-spacer' />
      <StyledIconButton
        icon='Inline/Remove'
        title='Close'
        onClick={handleCloseClick}
      />
    </StyledAppBar>
  );
}

const StyledAppBar = styled.header`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  gap: 4px;
  padding: 8px;
  & + .surface {
    margin-top: 0;
  }
`;

const StyledIcon = styled.div`
  border-radius: 50%;
  background-color: var(--charcoal-background3);
  text-align: center;
  padding: 8px;
  display: flex;
`;

const StyledIconButton = styled(IconButton)`
  pixiv-icon {
    --size: 12px;
    color: var(--charcoal-text3);
  }
`;
