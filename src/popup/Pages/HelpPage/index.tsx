import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';
import { t } from '@/shared/i18n';

const SHORTCUTS_URL = 'chrome://extensions/shortcuts';
const GITHUB_URL = 'https://github.com/moonseob/pixiv-bookmark-helper';

const openUrl = (url: string) => {
  try {
    chrome.tabs.create({ url });
  } catch {
    window.open(url, '_blank');
  }
};

export default function HelpPage() {
  return (
    <Container className='surface'>
      <Section>
        <SectionTitle>{t('help_keyboard_shortcuts_title')}</SectionTitle>
        <SectionText>{t('help_keyboard_shortcuts_body')}</SectionText>
        <SectionText>{t('help_keyboard_shortcuts_recommend')}</SectionText>
        <Button variant='Navigation' onClick={() => openUrl(SHORTCUTS_URL)}>
          {t('help_open_shortcuts')}
        </Button>
      </Section>
      <Section>
        <SectionTitle>{t('help_github_title')}</SectionTitle>
        <SectionText>{t('help_github_body')}</SectionText>
        <Button variant='Default' onClick={() => openUrl(GITHUB_URL)}>
          {t('help_open_github')}
        </Button>
      </Section>
      <Section>
        <SectionText>
          {t('help_disclaimer')}
        </SectionText>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  margin: 8px;
  overflow: auto;
`;

const Section = styled.section`
  background: var(--charcoal-surface2);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-weight: 600;
`;

const SectionText = styled.p`
  margin: 0;
  color: var(--charcoal-text2);
`;
