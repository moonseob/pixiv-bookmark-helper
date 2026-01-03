import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';
import ProfileCard from '@/components/ProfileCard';
import { useLoginStatus } from '@/popup/hooks/useLoginStatus';
import { useRandomJump } from '@/popup/hooks/useRandomJump';
import { useUserProfile } from '@/popup/hooks/useUserProfile';

export default function MainPage() {
  const {
    authStatus,
    refresh: refreshLoginStatus,
    userId,
  } = useLoginStatus(true);
  const isLoggedIn = authStatus === 'ready';

  const { profile, refresh: refreshProfile } = useUserProfile(
    userId,
    isLoggedIn,
  );

  // const {
  //   currentWorkId,
  //   isOnArtworkPage,
  //   isRemovingBookmark,
  //   isRemovalBlocked,
  //   handleRemoveBookmark,
  // } = useBookmarkCleanup(setStatus, isLoggedIn);

  const { isJumping, handleJump } = useRandomJump(() => {}, '', isLoggedIn);

  return (
    <>
      <StyledSurface className='surface'>
        <SectionTitle>Current user</SectionTitle>
        <ProfileCard
          authStatus={authStatus}
          profile={profile}
          onRecheck={() => {
            refreshLoginStatus();
            refreshProfile();
          }}
        />
      </StyledSurface>
      <StyledPrimaryButton
        variant='Primary'
        disabled={isJumping || isLoggedIn !== true}
        onClick={handleJump}
      >
        {isJumping ? 'Please wait...' : 'Random Bookmark'}
      </StyledPrimaryButton>
    </>
  );
}

const StyledPrimaryButton = styled(Button)`
  width: auto;
  box-sizing: border-box;
  margin: 8px;
`;

const StyledSurface = styled.div`
  flex: 1 1 0%;
  margin: 0 8px;
  padding: 8px 0;
  overflow-y: auto;
`;

const SectionTitle = styled.h3`
  font-size: 1em;
  font-weight: 500;
  margin: 0 8px;
  margin-bottom: 4px;
`;
