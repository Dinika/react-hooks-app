import { useState } from 'react';

export const useInputValidityHook = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  const onInputChange = event => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setIsInputValid(inputValue.trim() === '' ? false : true);
  };

  return {
    inputValue,
    onInputChange,
    isInputValid
  };
};
