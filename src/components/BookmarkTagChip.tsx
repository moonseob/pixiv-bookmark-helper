import { TagItem } from '@charcoal-ui/react';
import { t } from '@/shared/i18n';

const isUncategorizedTag = (name: string) => name === '未分類';

type BookmarkTagChipProps = {
  tagName: string;
  disabled?: boolean;
  onClear: () => void;
};

export default function BookmarkTagChip({
  tagName,
  disabled,
  onClear,
}: BookmarkTagChipProps) {
  const displayName = isUncategorizedTag(tagName)
    ? t('main_tag_uncategorized')
    : `#${tagName}`;
  return (
    <TagItem
      label={displayName}
      size='S'
      disabled={disabled}
      status='active'
      onClick={onClear}
    />
  );
}
