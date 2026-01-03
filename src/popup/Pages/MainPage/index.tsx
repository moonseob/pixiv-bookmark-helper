import { Button } from '@charcoal-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import BookmarkTagFilterStatus from '@/components/BookmarkTagFilterStatus';
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from '@/components/Card';
import ProfileCard from '@/components/ProfileCard';
import { useBookmarkTagFilter } from '@/popup/hooks/useBookmarkTagFilter';
import { useLoginStatus } from '@/popup/hooks/useLoginStatus';
import { useRandomJump } from '@/popup/hooks/useRandomJump';
import { useUserProfile } from '@/popup/hooks/useUserProfile';
import { t } from '@/shared/i18n';

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

  const { currentTagName, clearTag } = useBookmarkTagFilter(userId);
  const [isTagHelpOpen, setIsTagHelpOpen] = useState(false);

  // const {
  //   currentWorkId,
  //   isOnArtworkPage,
  //   isRemovingBookmark,
  //   isRemovalBlocked,
  //   handleRemoveBookmark,
  // } = useBookmarkCleanup(setStatus, isLoggedIn);

  const { isJumping, handleJump } = useRandomJump(
    () => {},
    '',
    isLoggedIn,
    currentTagName,
  );

  return (
    <>
      <StyledSurface className='surface'>
        <Card>
          <CardHeader>
            <CardTitle>{t('main_current_user')}</CardTitle>
          </CardHeader>
          <CardBody>
            <ProfileCard
              authStatus={authStatus}
              profile={profile}
              onRecheck={() => {
                refreshLoginStatus();
                refreshProfile();
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('main_tag_filter')}</CardTitle>
            <HelpToggleButton
              variant='Default'
              isActive={isTagHelpOpen}
              aria-label={
                isTagHelpOpen
                  ? t('main_tag_help_hide')
                  : t('main_tag_help_show')
              }
              title={
                isTagHelpOpen
                  ? t('main_tag_help_hide')
                  : t('main_tag_help_show')
              }
              onClick={() => setIsTagHelpOpen((prev) => !prev)}
            >
              <pixiv-icon name={isTagHelpOpen ? '24/Close' : '24/Info'} />
            </HelpToggleButton>
          </CardHeader>
          <CardBody>
            {isTagHelpOpen ? (
              <CardText>{t('help_tag_body')}</CardText>
            ) : (
              <BookmarkTagFilterStatus
                tagName={currentTagName}
                disabled={!isLoggedIn}
                onClear={clearTag}
              />
            )}
          </CardBody>
        </Card>
      </StyledSurface>
      <StyledPrimaryButton
        variant='Primary'
        disabled={isJumping || isLoggedIn !== true}
        onClick={handleJump}
      >
        {isJumping ? t('main_please_wait') : t('main_random_bookmark')}
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
  margin: 8px;
  padding: 8px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HelpToggleButton = styled(Button)`
  height: 24px;
  padding: 0 4px;
  min-height: 24px;
  font-size: 12px;
  pixiv-icon {
    --size: 16px;
  }
`;
