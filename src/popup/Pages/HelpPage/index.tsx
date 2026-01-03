import { Button } from '@charcoal-ui/react';
import styled from 'styled-components';

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
        <SectionTitle>Keyboard shortcuts</SectionTitle>
        <SectionText>
          You can enable the shortcut using the button below.
        </SectionText>
        <SectionText>Recommended shortcut: Ctrl+Shift+B.</SectionText>
        <Button variant='Navigation' onClick={() => openUrl(SHORTCUTS_URL)}>
          Open Shortcut Settings
        </Button>
      </Section>
      <Section>
        <SectionTitle>GitHub</SectionTitle>
        <SectionText>Open the repository for updates and issues.</SectionText>
        <Button variant='Default' onClick={() => openUrl(GITHUB_URL)}>
          Open GitHub
        </Button>
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
