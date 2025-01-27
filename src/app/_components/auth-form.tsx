// app/login/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';

import Button from './form-button';
import Input from './input-string';
import Separator from './separator';
import OTPInput from './input-otp';
import { ExternalLink } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showEmailInput && emailRef.current) {
      emailRef.current.focus();
    }
  }, [showEmailInput]);

  const PolicyText = () => (
    <div className="text-center text-[11px] mt-6 text-secondary-text-light dark:text-secondary-text-dark max-w-[90%] sm:max-w-[95%] mx-auto">
      By continuing, you acknowledge that you understand and agree to the{' '}
      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark inline-flex items-center space-x-1 transition-colors duration-200"
      >
        <span>Terms and Conditions</span>
        <ExternalLink className="w-3 h-3" />
      </a>{' '}
      and{' '}
      <a
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-secondary-text-light dark:text-secondary-text-dark hover:text-secondary-text-hover-light dark:hover:text-secondary-text-hover-dark inline-flex items-center space-x-1 transition-colors duration-200"
      >
        <span>Privacy Policy</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-6">
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

          {/* Desktop: Always show email input with separator */}
          <div className="hidden sm:block">
            <Separator />
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-secondary-text-light dark:text-secondary-text-dark text-sm font-medium mb-2"
              >
                Email
              </label>
              <Formik
                initialValues={{ email: '', otp: '' }}
                onSubmit={(values) => {
                  console.log('Form submitted:', values);
                  setShowOTP(true);
                }}
              >
{({ isSubmitting, errors, touched, setFieldError, setFieldTouched }: FormikProps<{ email: string; otp: string }>) => (
  <Form>
    <div className="mt-4">
      <label
        htmlFor="email"
        className="block text-secondary-text-light dark:text-secondary-text-dark text-sm font-medium mb-2"
      >
        Email
      </label>
      <Field
        name="email"
        id="email"
        type="email"
        as={Input}
        placeholder="Enter your email address..."
        className="py-[10px]"
        required
        autoFocus={true}
        disabled={showOTP}
      />
      {errors.email && touched.email && (
        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
      )}
      {showOTP && (
        <div className="mt-4">
          <label
            htmlFor="otp"
            className="block text-secondary-text-light dark:text-secondary-text-dark text-sm font-medium mb-2"
          >
            Login code
          </label>
          <OTPInput
            id="otp"
            name="otp"
            length={6}
            onChange={({ target: { value } }) => console.log('OTP Entered:', value)}
            onBlur={() => console.log('OTP Field Blurred')}
            setFieldError={setFieldError}
            setFieldTouched={setFieldTouched}
          />
        </div>
      )}
    </div>
    <div className="mt-6">
      <Button
        type="submit"
        variation="submit"
        disabled={isSubmitting}
      >
        {showOTP ? 'Continue with login code' : 'Continue'}
      </Button>
    </div>
  </Form>
)}

              </Formik>
            </div>
          </div>

          {/* Mobile: Show "Continue with Email" button */}
          <div className="block sm:hidden">
            <Button
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 493.497 493.497"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  aria-label="Email Icon"
                >
                  <path d="M444.556,85.218H48.942C21.954,85.218,0,107.171,0,134.16v225.177c0,26.988,21.954,48.942,48.942,48.942h395.613  c26.988,0,48.941-21.954,48.941-48.942V134.16C493.497,107.171,471.544,85.218,444.556,85.218z M460.87,134.16v225.177  c0,2.574-0.725,4.924-1.793,7.09L343.74,251.081l117.097-117.097C460.837,134.049,460.87,134.096,460.87,134.16z M32.628,359.336  V134.16c0-0.064,0.033-0.11,0.033-0.175l117.097,117.097L34.413,366.426C33.353,364.26,32.628,361.911,32.628,359.336z   M251.784,296.902c-2.692,2.691-7.378,2.691-10.07,0L62.667,117.846h368.172L251.784,296.902z M172.827,274.152l45.818,45.819  c7.512,7.511,17.493,11.645,28.104,11.645c10.61,0,20.592-4.134,28.104-11.645l45.82-45.819l101.49,101.499H71.327L172.827,274.152z  "></path>
                </svg>
              }
              onClick={() => setShowEmailInput(true)}
            >
              Continue with Email
            </Button>
            {showEmailInput && (
              <Formik
                initialValues={{ email: '', otp: '' }}
                onSubmit={(values) => {
                  console.log('Form submitted:', values);
                  setShowOTP(true);
                }}
              >
                {({ isSubmitting, errors, touched }: FormikProps<{ email: string; otp: string }>) => (
                  <Form>
                    <div className="mt-4">
                      <label
                        htmlFor="email"
                className="block text-secondary-text-light dark:text-secondary-text-dark text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        id="email"
                        type="email"
                        as={Input}
                        placeholder="Enter your email address..."
                        className="py-[10px]"
                        required
                        autoFocus={true}
                        disabled={showOTP}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                      )}
                      {showOTP && (
                        <div className="mt-4">
                          <label
                            htmlFor="otp"
                className="block text-secondary-text-light dark:text-secondary-text-dark text-sm font-medium mb-2"
                          >
                            Login code
                          </label>
                          <OTPInput
                            id="otp"
                            name="otp"
                            length={6}
                            onChange={({ target: { value } }) => console.log('OTP Entered:', value)}
                            onBlur={() => console.log('OTP Field Blurred')}
                          />
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <Button type="submit"
                      variation="submit"
                       disabled={isSubmitting}>
                        {showOTP ? 'Continue with login code' : 'Continue'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>

        <PolicyText />
      </div>
    </div>
  );
};

export default LoginForm;