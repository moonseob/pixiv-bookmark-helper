import { LoadingSpinner } from '@charcoal-ui/react';

export default function PixivChecking() {
  return (
    <div className='blocker surface'>
      <LoadingSpinner size={40} padding={12} />
      <p>Checking site status...</p>
    </div>
  );
}
