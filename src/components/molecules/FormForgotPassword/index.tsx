import React, { FormEvent, memo, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input, OTPInput } from 'components';
import { useSelector } from 'react-redux';

import { EMAIL_REGEX } from 'helpers';
import { GeetestCaptchaResponse } from 'modules';
import { selectMobileDeviceState } from 'modules/public/globalSettings';
import { IcMessage } from 'assets';

interface FormForgotPasswordProps {
   title?: string;
   subTitle?: string;
   subTitleOtp?: string;
   buttonLabel?: string;
   errorMessage?: string;
   isLoading?: boolean;
   OnSubmit: () => void;
   className?: string;
   emailLabel?: string;
   email: string;
   message?: string;
   emailError: string;
   // emailFocused: boolean;
   placeholder?: string;
   validateForm: () => void;
   handleInputEmail: (value: string) => void;
   handleFieldFocus: () => void;
   captchaType?: 'recaptcha' | 'geetest' | 'none';
   renderCaptcha?: JSX.Element | null;
   reCaptchaSuccess?: boolean;
   geetestCaptchaSuccess?: boolean;
   captcha_response?: string | GeetestCaptchaResponse;
}

export const FormForgotPassword = memo((props: FormForgotPasswordProps) => {
   const [displayEMail, setDisplayEMail] = useState<string>('');

   const [renderInputEmail, setRenderInputEmail] = useState<boolean>(true);
   const [renderInputOtp, setRenderInputOtp] = useState<boolean>(false);
   const [renderInputNewPass, setRenderInputNewPass] = useState<boolean>(false);

   const initialMinute = 0;
   const [initialSeconds, setInitialSeconds] = useState<number>(60);
   const [minutes, setMinutes] = useState(initialMinute);
   const [seconds, setSeconds] = useState(initialSeconds);
   useEffect(() => {
      let myInterval = setInterval(() => {
         if (seconds > 0) {
            setSeconds(seconds - 1);
         }
         if (seconds === 0) {
            if (minutes === 0) {
               clearInterval(myInterval)
            } else {
               setMinutes(minutes - 1);
               setSeconds(59);
            }
         }
      }, 1000)
      return () => {
         clearInterval(myInterval);
      };
   }, [minutes, seconds]);

   const handleRenderInputOtp = () => {
      setDisplayEMail(email);
      setRenderInputEmail(!renderInputEmail);
      setRenderInputOtp(!renderInputOtp)
   };
   const handleRenderInputNewPass = () => {
      setRenderInputNewPass(!renderInputNewPass);
      return <Redirect to="/accounts/password_reset" />
   }

   const isMobileDevice = useSelector(selectMobileDeviceState);

   const {
      buttonLabel,
      isLoading,
      emailLabel,
      message,
      email,
      // emailFocused,
      emailError,
      captchaType,
      geetestCaptchaSuccess,
      reCaptchaSuccess,
      OnSubmit,
      validateForm,
      placeholder,
      title,
      subTitle,
      subTitleOtp,
   } = props;

   const handleSubmitForm = () => OnSubmit();

   const isValidForm = () => {
      const isEmailValid = email.match(EMAIL_REGEX);
      return email && isEmailValid;
   };

   const isButtonDisabled = (): boolean => {
      if (isLoading || !email.match(EMAIL_REGEX)) {
         return true;
      }

      if (captchaType === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }

      if (captchaType === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }

      return false;
   };

   const handleClick = (e: FormEvent<HTMLInputElement>) => {
      if (e) e.preventDefault();
      if (!isValidForm()) {
         validateForm();
         handleRenderInputOtp();
      }
      else {
         handleSubmitForm();
         handleRenderInputOtp();
      }
   };

   return (
      <>
         {
            renderInputEmail ? (
               <div>
                  <div className="pb-8 mb-8 border-b border-solid border-[#E6E8EC]">
                     <div className="mb-8 text-center text-[40px] leading-[1.2] tracking-[-.01em] font-dm font-bold text-[#23262f]">
                        {title}
                     </div>
                     {
                        subTitle && (
                           <div className="text-center text-xs leading-[1.66667] text-[#777E90]">
                              {subTitle}
                           </div>
                        )
                     }
                  </div>
                  <form>
                     <div>{message}</div>
                     <div>
                        <Input
                           type="email"
                           label={emailLabel || 'Email'}
                           placeholder={placeholder}
                           defaultLabel="Email"
                           handleChangeInput={props.handleInputEmail}
                           inputValue={email}
                           handleFocusInput={props.handleFieldFocus}
                           classNameLabel="cr-email-form__label"
                           classNameInput="cr-email-form__input"
                           autoFocus={!isMobileDevice}
                           isIcon
                           icRight={<IcMessage className="w-6 h-6 inline-block cursor-pointer" />}
                        />
                        {emailError && <div className="cr-email-form__error">{emailError}</div>}
                     </div>
                     {props.renderCaptcha}
                     <Button
                        type="button"
                        disabled={isButtonDisabled()}
                        onClick={handleClick as any}
                        textButton={isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Send'}
                     />
                  </form>
               </div>
            ) : renderInputOtp && (
               <>
                  <div className="pb-8 mb-8 border-b border-solid border-[#E6E8EC]">
                     <div className="mb-8 text-center text-[40px] leading-[1.2] tracking-[-.01em] font-dm font-bold text-[#23262f]">
                        {title}
                     </div>
                     {
                        subTitle && (
                           <>
                              <div className="text-center text-xs leading-[1.66667] text-[#777E90]">
                                 {subTitleOtp}
                              </div>
                              <div className="text-center text-xs leading-[1.66667] text-[#777E90]">Verify your account, we sent a code to <span className="font-bold text-primary1">{displayEMail}</span></div>
                           </>
                        )
                     }
                  </div>
                  <OTPInput
                     autoFocus
                     length={6}
                     className="flex -mt-16 mb-8 -mx-2 bg-neutral8"
                     onChangeOTP={otp => console.log(`OTP => : ${otp}`)}
                  />
                  <div className="login__btns">
                  {
                     minutes === 0 && seconds === 0
                        ? (
                           <button onClick={() => setInitialSeconds(60)} className="button-stroke button-small login__button">{'Resend Code'}</button>
                        )
                        : (<div> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>)
                  }
                     <button className="button button-small login__button" onClick={handleRenderInputNewPass}>Continue</button>
                  </div>
               </>
            )
         }
      </>
   );
});
