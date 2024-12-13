// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { Mail } from 'lucide-react';

import Button from '@/modules/common/components/Button';
import Input from '@/modules/common/components/Input';
import Separator from '@/modules/common/components/Separator';
import OTPInput from '@/modules/common/components/OTPInput';

const LoginForm: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6">
        {/* Buttons Container */}
        <div className="space-y-4">
          {/* Continue with Google Button */}
          <Button
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#4285F4"
                  d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
                />
                <path
                  fill="#34A853"
                  d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
                />
                <path
                  fill="#FBBC04"
                  d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
                />
                <path
                  fill="#EA4335"
                  d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
                />
              </svg>
            }
            onClick={() => {
              console.log('Handle Google Login');
            }}
          >
            Continue with Google
          </Button>

          {/* Continue with Apple Button */}
          <Button
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 22.773 22.773"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
              </svg>
            }
            onClick={() => {
              console.log('Handle Apple Login');
            }}
          >
            Continue with Apple
          </Button>

          {/* Continue with Email Button (Mobile Only) */}
          <div className="block sm:hidden">
            <Button
              icon={<Mail className="w-5 h-5" />}
              onClick={() => setShowEmailInput(true)}
            >
              Continue with Email
            </Button>
          </div>
        </div>

        {/* Separator */}
        <Separator />

<Formik
  initialValues={{ email: '', otp: '' }}
  onSubmit={(values) => {
    console.log('Form submitted:', values);
    if (!showOTP) {
      setShowOTP(true);
    } else {
      console.log('Verify OTP');
    }
  }}
>
  {({
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  }: FormikProps<{ email: string; otp: string }>) => (
    <Form>
      {/* Email Input */}
      {showEmailInput && (
        <div className="mt-4">
          <Field
            name="email"
            type="email"
            as={Input}
            placeholder="Email"
            required
          />
          {errors.email && touched.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>
      )}

      {/* OTP Input */}
      {showOTP && (
        <div className="mt-4">
          <OTPInput
            id="otp"
            name="otp"
            length={6}
            onChange={({ target: { value } }) => setFieldValue('otp', value)} // Match the expected type
            onBlur={() => setFieldTouched('otp', true)}
            onFullFill={() => console.log('OTP Complete!')}
            setFieldError={(field, message) => console.error(`${field}: ${message}`)}
            setFieldTouched={setFieldTouched}
            disabled={isSubmitting}
          />
          {errors.otp && touched.otp && (
            <div className="text-red-500 text-sm mt-1">{errors.otp}</div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button type="submit" disabled={isSubmitting}>
          {showOTP ? 'Verify OTP' : 'Send OTP'}
        </Button>
      </div>
    </Form>
  )}
</Formik>

      </div>
    </div>
  );
};

export default LoginForm;
