import { Icon } from '@charcoal-ui/react';

export default function PixivBlocked() {
  return (
    <div className='blocker surface'>
      <Icon name='24/Warning' />
      <p>Available only on the pixiv website.</p>
    </div>
  );
}
