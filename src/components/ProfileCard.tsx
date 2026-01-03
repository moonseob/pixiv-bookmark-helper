import { Button, Icon, LoadingSpinner } from '@charcoal-ui/react';
import styled from 'styled-components';
import type { AuthStatus } from '@/popup/hooks/useLoginStatus';
import { t } from '@/shared/i18n';
import type { UserProfile } from '@/storage/userProfile';

export default function ProfileCard({
  authStatus,
  profile,
  onRecheck,
}: {
  authStatus: AuthStatus;
  profile: UserProfile | null;
  onRecheck: () => void;
}) {
  if (authStatus === 'checking') {
    return (
      <Container>
        <LoadingSpinner size={24} padding={4} transparent />
      </Container>
    );
  }
  return (
    <Container>
      <AvatarWrapper>
        <img src={profile?.image} alt='' />
      </AvatarWrapper>

      <div style={{ minWidth: 0 }}>
        <Name>
          {profile?.userId ||
            (authStatus === 'needs_login' ? t('profile_please_login') : '')}
        </Name>
        <Sub>{profile?.name}</Sub>
      </div>
      <div className='flex-spacer' />
      <RefreshButton
        variant='Default'
        title={t('main_refresh_user')}
        aria-label={t('main_refresh_user')}
        onClick={onRecheck}
      >
        <Icon name='24/Reload' />
      </RefreshButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  gap: 8px;
  text-align: start;
  color: var(--charcoal-text1);
  pixiv-icon {
    --size: 16px;
    color: var(--charcoal-text2);
  }
`;

const AvatarWrapper = styled.div`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  background-color: var(--charcoal-background1);
  border-radius: 50%;
  overflow: hidden;
  img { width: 100%; }
`;

const Name = styled.p`
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Sub = styled.p`
  margin: 0;
  font-size: 10px;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RefreshButton = styled(Button)`
  height: 24px;
  min-height: 24px;
  padding: 0 4px;
  color: var(--charcoal-text3);
  pixiv-icon {
    --size: 16px;
  }
`;
