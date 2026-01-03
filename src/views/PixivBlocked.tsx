import { Icon } from '@charcoal-ui/react';
import { t } from '@/shared/i18n';

export default function PixivBlocked() {
  return (
    <div className='blocker surface'>
      <Icon name='24/Warning' />
      <p>{t('pixiv_blocked')}</p>
    </div>
  );
}
