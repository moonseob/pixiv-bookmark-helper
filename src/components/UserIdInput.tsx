import { Button, TextField } from '@charcoal-ui/react';
import { useState } from 'react';

export default function UserIdInput() {
  const [isDirty, setIsDirty] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (value: string) => {
    if (!isDirty) setIsDirty(true);
    setValue(value);
  };

  const handleSave = () => {
    setIsDirty(false);
    // TODO: 들어온 값이 실제로 존재하는 user id인지 pixiv api를 사용해서 검증하기
  };

  return (
    <>
      <TextField
        showLabel
        label='User ID'
        prefix='pixiv.net/users/'
        placeholder='000000'
        value={value}
        invalid={isDirty && !value}
        onChange={handleChange}
        // TODO: user id input value가 숫자만으로 구성되도록 validate
      />
      {isDirty && (
        <Button variant='Navigation' fullWidth onClick={handleSave}>
          Save
        </Button>
      )}
    </>
  );
}
