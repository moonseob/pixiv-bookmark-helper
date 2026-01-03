import { IconButton } from '@charcoal-ui/react';
import styled from 'styled-components';
import { t } from '@/shared/i18n';
import logo from '/logo.png?url';

type AppBarProps = {
  title?: string;
  onBack?: () => void;
};

export default function AppBar({
  title = t('app_bar_title_main'),
  onBack,
}: AppBarProps) {
  const handleCloseClick = () => window.close();
  return (
    <StyledAppBar>
      {onBack ? (
        <IconButton icon='24/Prev' title={t('app_bar_back')} onClick={onBack} />
      ) : (
        <StyledIcon>
          <img src={logo} alt='' width={16} />
        </StyledIcon>
      )}
      <span>{title}</span>
      <div className='flex-spacer' />
      <StyledIconButton
        icon='16/Remove'
        title={t('app_bar_close')}
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
  padding: 12px;
  display: flex;
`;

const StyledIconButton = styled(IconButton)`
  pixiv-icon {
    --size: 20px;
    color: var(--charcoal-text3);
  }
`;
