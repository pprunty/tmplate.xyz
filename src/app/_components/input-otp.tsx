'use client';

import React, { useEffect, useRef, useState } from 'react';

interface OTPInputProps {
  id: string;
  name: string;
  length: number;
  onChange: (event: { target: { name: string; value: string } }) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFullFill?: () => void;
  setFieldError?: (field: string, message: string) => void;
  setFieldTouched?: (field: string, isTouched: boolean) => void;
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

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (disabled) return;
    const newValue = event.target.value.slice(-1);
    const newOtp = [...localOtp];
    newOtp[index] = newValue;
    setLocalOtp(newOtp);

    const newErrors = [...errors];
    if (newValue === '') {
      newErrors[index] = false;
      if (setFieldError) {
        setFieldError('otp', '');
      }
    } else {
      const isValid = isValidInput(newValue, inputType);
      if (!isValid) {
        if (setFieldError) {
          setFieldError(
            'otp',
            `invalid character '${newValue}'. only numeric values allowed`,
          );
        }
        newErrors[index] = true;
      } else {
        if (setFieldError) {
          setFieldError('otp', '');
        }
        newErrors[index] = false;
      }
    }
    setErrors(newErrors);

    const isOtpComplete = newOtp.every((val) => val.length === 1);
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
    if (setFieldTouched) setFieldTouched(name, true);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newErrors = [...errors];

    if (e.key === 'Backspace') {
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
            value: newOtp.join(''),
          },
        });
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...localOtp];
        newOtp[index] = '';
        setLocalOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-x-2 mt-2 max-w-full">
      {localOtp.map((_, index) => (
        <React.Fragment key={index}>
          <input
            id={id}
            name={name}
            type={inputType === 'numeric' ? 'tel' : 'text'}
            maxLength={1}
            value={localOtp[index]}
            onChange={(e) => handleChange(e, index)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className={`
              flex-grow w-full max-w-[4rem]
              h-14 sm:h-13
              text-center text-xl font-mono border rounded focus:outline-none
              ${errors[index] ? 'border-red-500 animate-shake' : 'border-primary-border-light dark:border-primary-border-dark'}
              ${disabled ? 'bg-secondary-background-light dark:bg-secondary-background-dark' : 'bg-primary-background-light dark:bg-primary-background-dark'}
              ${errors[index] ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-contrast-light focus:border-contrast-light dark:focus:ring-contrast-dark dark:focus:border-contrast-dark'}
            `}
            disabled={disabled}
            autoComplete={autoComplete}
            autoCapitalize="none"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

const isValidInput = (
  value: string,
  inputType: 'alphanumeric' | 'alphabetic' | 'numeric',
): boolean => {
  const regexMap = {
    alphanumeric: /^[a-z0-9]$/i,
    alphabetic: /^[a-z]$/i,
    numeric: /^[0-9]$/i,
  };
  return regexMap[inputType]?.test(value) ?? false;
};

export default OTPInput;
