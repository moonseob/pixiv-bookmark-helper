import { LoadingSpinner } from '@charcoal-ui/react';
import { t } from '@/shared/i18n';

export default function PixivChecking() {
  return (
    <div className='blocker surface'>
      <LoadingSpinner size={40} padding={12} />
      <p>{t('pixiv_checking')}</p>
    </div>
  );
}
