import styled from 'styled-components';
import BookmarkTagChip from '@/components/BookmarkTagChip';
import { t } from '@/shared/i18n';

type BookmarkTagFilterStatusProps = {
  tagName: string | null;
  disabled?: boolean;
  onClear: () => void;
};

export default function BookmarkTagFilterStatus({
  tagName,
  disabled,
  onClear,
}: BookmarkTagFilterStatusProps) {
  return (
    <TagList>
      {tagName ? (
        <BookmarkTagChip
          tagName={tagName}
          disabled={disabled}
          onClear={onClear}
        />
      ) : (
        <TagPlaceholder aria-disabled={disabled}>
          {t('main_tag_all')}
        </TagPlaceholder>
      )}
    </TagList>
  );
}

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagPlaceholder = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 8px;
  background: var(--charcoal-surface2);
  border: 1px solid var(--charcoal-surface3);
  color: var(--charcoal-text2);
  font-size: 12px;
  font-weight: 500;
`;
