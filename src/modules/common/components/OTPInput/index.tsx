'use client';

import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  id: string;
  name: string;
  length: number;
  onChange: (event: { target: { name: string; value: string } }) => void; // Updated to match the expected argument
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void; // Updated to accept an event
  onFullFill?: () => void; // Make this optional
  setFieldError: (field: string, message: string) => void;
  setFieldTouched: (field: string, isTouched: boolean) => void;
  autoFocus?: boolean;
  autoSubmit?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  inputType?: 'alphanumeric' | 'alphabetic' | 'numeric';
}

const OTPInput: React.FC<OTPInputProps> = ({
  id,
  name,
  length,
  onChange,
  onBlur,
  onFullFill,
  setFieldError,
  setFieldTouched,
  autoFocus = true,
  autoSubmit = true,
  disabled,
  autoComplete = 'one-time-code',
  inputType = 'numeric',
}) => {
  const [errors, setErrors] = useState(Array(length).fill(false));
  const [localOtp, setLocalOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const t = useTranslations('HomePage');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

{/*  const resetOtp = () => {
    setLocalOtp(new Array(length).fill(''));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
      setFieldTouched("otp", true);
    }
  };*/}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (disabled) return;
    const newValue = event.target.value.slice(-1);
    const newOtp = [...localOtp];
    newOtp[index] = newValue;
    setLocalOtp(newOtp);

    const newErrors = [...errors];
    if (newValue === '') {
      newErrors[index] = false;
      setFieldError("otp", "");
    } else {
      const isValid = isValidInput(newValue, inputType);
      if (!isValid) {
        setFieldError("otp", `invalid character '${newValue}'. only numeric values allowed`);
        newErrors[index] = true;
      } else {
        setFieldError("otp", "");
        newErrors[index] = false;
      }
    }
    setErrors(newErrors);

    const isOtpComplete = newOtp.every(val => val.length === 1);
    if (isOtpComplete && !newErrors.includes(true)) {
      onChange({
        target: {
          name: name,
          value: newOtp.join(''),
        },
      });

      if (autoSubmit && onFullFill) {
        onFullFill();
      }
    }


    if (newValue.length === 1 && isValidInput(newValue, inputType)) {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur(e);
    setFieldTouched(name, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const newErrors = [...errors];

    if (e.key === "Backspace") {
      e.preventDefault();
      newErrors[index] = false;
      setErrors(newErrors);

      if (localOtp[index] === '' && index > 0) {
        const newOtp = [...localOtp];
        newOtp[index - 1] = '';
        setLocalOtp(newOtp);
        onChange({
          target: {
            name: name,
            value: newOtp.join('')
          }
        });
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...localOtp];
        newOtp[index] = '';
        setLocalOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center mt-2 max-w-full box-border">
      {localOtp.map((_, index) => (
        <React.Fragment key={index}>
          <input
            id={id}
            name={name}
            type={inputType === 'numeric' ? 'tel' : 'text'}
            maxLength={1}
            value={localOtp[index]}
            onChange={e => handleChange(e, index)}
            onBlur={handleBlur}
            onKeyDown={e => handleKeyDown(e, index)}
            ref={el => { inputRefs.current[index] = el; }}
            className={`w-10 h-12 mx-1 text-center text-xl font-mono border rounded focus:outline-none
              ${errors[index] ? 'border-otp-border-error animate-shake' : 'border-otp-border-light dark:border-otp-border-dark'}
              ${disabled ? 'bg-otp-bg-disabled' : 'bg-otp-bg-light dark:bg-otp-bg-dark'}
              ${errors[index] ? 'focus:border-otp-border-error' : 'focus:border-otp-focus-light dark:focus:border-otp-focus-dark'}
              `}
            disabled={disabled}
            autoComplete={autoComplete}
            autoCapitalize="none"
          />
          {index === Math.floor(length / 2) - 1 && <div className="flex items-center justify-center mx-2 text-xs text-gray-600 dark:text-gray-400">-</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const isValidInput = (value: string, inputType: 'alphanumeric' | 'alphabetic' | 'numeric'): boolean => {
  const regexMap = {
    alphanumeric: /^[a-z0-9]$/i,
    alphabetic: /^[a-z]$/i,
    numeric: /^[0-9]$/i,
  };
  return regexMap[inputType]?.test(value) ?? false;
};

export default OTPInput;
