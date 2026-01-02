import { Button } from '@charcoal-ui/react';
import { type ReactNode, useState } from 'react';

export default function NavigationButton() {
  const [pressed, setPressed] = useState(false);
  const text: {
    node: ReactNode;
    i18nProp: string;
  } = pressed
    ? {
        node: 'Please wait...',
        i18nProp: '',
      }
    : {
        node: 'Random Bookmark',
        i18nProp: '',
      };

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 2000);
  };
  return (
    <Button
      variant='Primary'
      fullWidth
      disabled={pressed}
      onClick={handleClick}
    >
      {text.node}
    </Button>
  );
}
