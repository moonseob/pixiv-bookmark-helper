const { execSync, spawnSync } = require('node:child_process');

const buildPrompt = (diff) => `You are a coding agent working in the repo.
Task: Review ONLY the git diff below. If any user-visible strings or manifest strings were added/changed, update localization accordingly.
- Add/modify keys in public/_locales/en/messages.json, public/_locales/ko/messages.json, public/_locales/ja/messages.json.
- Ensure UI/manifest strings map to keys via chrome.i18n (t('...') or __MSG_...__).
- Keep English as the source of truth.
- Use 'pixiv' lowercase in UI/documentation.
- Avoid behavior changes beyond i18n mapping.
If no localization updates are needed, respond with "No i18n updates needed."

Git diff:
${diff}
`;

const getDiff = () => {
  try {
    const diff = execSync('git diff', { encoding: 'utf8' }).trim();
    return diff;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Failed to read git diff:', message);
    process.exit(1);
  }
};

const runCodex = (prompt) => {
  const result = spawnSync(
    'codex',
    [
      'exec',
      '--full-auto',
      '-c',
      'approval_policy="on-request"',
      '-C',
      '.',
      prompt,
    ],
    {
    stdio: 'inherit',
    },
  );

  if (result.error) {
    console.error('Failed to run codex CLI.');
    console.error('Paste the prompt below into codex manually:\n');
    console.error(prompt);
    process.exit(1);
  }

  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status);
  }
};

const main = () => {
  const diff = getDiff();
  if (!diff) {
    console.log('No git diff found.');
    return;
  }
  const prompt = buildPrompt(diff);
  runCodex(prompt);
};

main();
