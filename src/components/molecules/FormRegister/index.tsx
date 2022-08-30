import cr from 'classnames';
import React, { FC, FormEvent, KeyboardEvent, memo, useCallback, useMemo, useState } from 'react';
// import { Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Input, Button, PasswordStrengthBar } from 'components';
import { isUsernameEnabled } from 'api';
import {
   EMAIL_REGEX,
   ERROR_LONG_USERNAME,
   ERROR_SHORT_USERNAME,
   PASSWORD_REGEX,
   USERNAME_REGEX,
} from 'helpers';
import { GeetestCaptchaResponse } from 'modules';
import { selectMobileDeviceState } from 'modules/public/globalSettings';
import { IcEye, IcEyeClose } from 'assets';

export interface RegisterProps {
   isLoading?: boolean;
   title?: string;
   subTitle?: string;
   onSignUp: () => void;
   onSignIn?: () => void;
   className?: string;
   image?: string;
   labelSignIn?: string;
   labelSignUp?: string;
   usernameLabel?: string;
   emailLabel?: string;
   passwordLabel?: string;
   confirmPasswordLabel?: string;
   referalCodeLabel?: string;
   termsMessage?: string;
   refId: string;
   password: string;
   username: string;
   email: string;
   confirmPassword: string;
   handleChangeUsername: (value: string) => void;
   handleChangeEmail: (value: string) => void;
   handleChangePassword: (value: string) => void;
   handleChangeConfirmPassword: (value: string) => void;
   handleChangeRefId: (value: string) => void;
   hasConfirmed: boolean;
   clickCheckBox: (e: any) => void;
   validateForm: () => void;
   emailError: string;
   passwordError: string;
   confirmationError: string;
   handleFocusUsername: () => void;
   handleFocusEmail: () => void;
   handleFocusPassword: () => void;
   handleFocusConfirmPassword: () => void;
   handleFocusRefId: () => void;
   confirmPasswordFocused: boolean;
   refIdFocused: boolean;
   usernameFocused: boolean;
   emailFocused: boolean;
   passwordFocused: boolean;
   captchaType: 'recaptcha' | 'geetest' | 'none';
   renderCaptcha: JSX.Element | null;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   captcha_response?: string | GeetestCaptchaResponse;
   currentPasswordEntropy: number;
   minPasswordEntropy: number;
   passwordErrorFirstSolved: boolean;
   passwordErrorSecondSolved: boolean;
   passwordErrorThirdSolved: boolean;
   passwordPopUp: boolean;
   myRef: any;
   passwordWrapper: any;
   translate: (id: string) => string;
}

const RegisterFormMemo: FC<RegisterProps> = ({
   username,
   email,
   confirmPassword,
   refId,
   onSignIn,
   image,
   isLoading,
   labelSignIn,
   labelSignUp,
   usernameLabel,
   emailLabel,
   confirmPasswordLabel,
   passwordFocused,
   referalCodeLabel,
   termsMessage,
   captchaType,
   geetestCaptchaSuccess,
   hasConfirmed,
   reCaptchaSuccess,
   currentPasswordEntropy,
   passwordPopUp,
   password,
   passwordLabel,
   emailError,
   translate,
   confirmationError,
   usernameFocused,
   emailFocused,
   passwordErrorFirstSolved,
   passwordErrorSecondSolved,
   confirmPasswordFocused,
   handleChangePassword,
   passwordErrorThirdSolved,
   handleFocusPassword,
   minPasswordEntropy,
   refIdFocused,
   validateForm,
   onSignUp,
   handleChangeUsername,
   handleFocusUsername,
   handleChangeEmail,
   handleFocusEmail,
   handleChangeConfirmPassword,
   handleFocusConfirmPassword,
   handleChangeRefId,
   handleFocusRefId,
   clickCheckBox,
   renderCaptcha,
   title,
   subTitle,
}) => {
   const [viewPass, setViewPass] = useState<boolean>(true);
   const [viewConPass, setViewConPass] = useState<boolean>(true)
   const handleViewPass = () => setViewPass(!viewPass);
   const handleViewConPass = () => setViewConPass(!viewConPass);

   const isMobileDevice = useSelector(selectMobileDeviceState);
   const history = useHistory();
   const { formatMessage } = useIntl();

   const disableButton = useMemo((): boolean => {
      if (!hasConfirmed || isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword ||
         (isUsernameEnabled() && !username.match(USERNAME_REGEX))) {
         return true;
      }
      if (captchaType === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }
      if (captchaType === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }

      return false;
   }, [
      captchaType,
      confirmPassword,
      username,
      email,
      geetestCaptchaSuccess,
      hasConfirmed,
      isLoading,
      password,
      reCaptchaSuccess,
   ]);

   // const renderPasswordInput = useCallback(() => {
   //    return (
   //       <>
   //          <Input
   //             type={`${viewPass ? 'password' : 'text'}`}
   //             label={passwordLabel || 'Password'}
   //             placeholder={passwordLabel || 'Password'}
   //             defaultLabel="Password"
   //             handleChangeInput={handleChangePassword}
   //             inputValue={password}
   //             handleFocusInput={handleFocusPassword}
   //             autoFocus={false}
   //             isIcon
   //             icRight={viewPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
   //             handleViewPass={handleViewPass}
   //          />
   //          {password && (
   //             <PasswordStrengthMeter
   //                minPasswordEntropy={minPasswordEntropy}
   //                currentPasswordEntropy={currentPasswordEntropy}
   //                passwordExist={password !== ''}
   //                passwordErrorFirstSolved={passwordErrorFirstSolved}
   //                passwordErrorSecondSolved={passwordErrorSecondSolved}
   //                passwordErrorThirdSolved={passwordErrorThirdSolved}
   //                passwordPopUp={passwordPopUp}
   //                translate={translate}
   //             />
   //          )}
   //       </>
   //    );
   // }, [
   //    currentPasswordEntropy,
   //    password,
   //    passwordFocused,
   //    passwordLabel,
   //    passwordPopUp,
   //    handleChangePassword,
   //    handleFocusPassword,
   //    minPasswordEntropy,
   //    passwordErrorFirstSolved,
   //    passwordErrorSecondSolved,
   //    passwordErrorThirdSolved,
   //    translate,
   // ]);

   const handleSubmitForm = useCallback(() => {
      onSignUp();
   }, [onSignUp]);

   const isValidForm = useCallback(() => {
      const isEmailValid = email.match(EMAIL_REGEX);
      const isPasswordValid = password.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = password === confirmPassword;

      return email && isEmailValid && password && isPasswordValid && confirmPassword && isConfirmPasswordValid;
   }, [confirmPassword, email, password]);

   const handleClick = useCallback((e?: FormEvent<HTMLInputElement>) => {
      if (e) {
         e.preventDefault();
      }
      if (!isValidForm()) {
         validateForm();
      } else {
         handleSubmitForm();
      }
   },
      [handleSubmitForm, isValidForm, validateForm]
   );

   const handleEnterPress = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
            e.preventDefault();
            handleClick();
         }
      },
      [handleClick]
   );

   const renderUsernameError = (nick: string) => {
      return nick.length < 4 ? translate(ERROR_SHORT_USERNAME) : translate(ERROR_LONG_USERNAME);
   };

   const renderLogIn = useCallback(() => {
      return (
         <div className="pg-sign-up-screen__login">
            <span>
               {formatMessage({ id: 'page.header.signUp.alreadyRegistered' })}
               <span onClick={() => history.push('/signin')} className="pg-sign-up-screen__login-button">
                  {formatMessage({ id: 'page.mobile.header.signIn' })}
               </span>
            </span>
         </div>
      );
   }, [history, formatMessage]);

   return (
      <>
         <div className="pb-4 mb-8 border-b border-solid border-[#E6E8EC]">
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
            <div onKeyPress={handleEnterPress} className="space-y-5">
               {isUsernameEnabled() && (
                  <div
                     className={cr('cr-sign-up-form__group', {
                        'cr-sign-up-form__group--focused': usernameFocused,
                        'cr-sign-up-form__group--errored': username.length &&
                           !usernameFocused && !username.match(USERNAME_REGEX),
                     })}>
                     <Input
                        type="text"
                        label={usernameLabel || 'Username'}
                        placeholder={usernameLabel || 'Username'}
                        defaultLabel="Username"
                        handleChangeInput={handleChangeUsername}
                        inputValue={username}
                        handleFocusInput={handleFocusUsername}
                        classNameLabel="cr-sign-up-form__label"
                        classNameInput="cr-sign-up-form__input"
                        autoFocus={!isMobileDevice}
                     />
                     {!username.match(USERNAME_REGEX) && !usernameFocused && username.length ? (
                        <div className="cr-sign-up-form__error">
                           {renderUsernameError(username)}
                        </div>
                     ) : null}
                  </div>
               )}
               <div
                  className={cr('cr-sign-up-form__group', {
                     'cr-sign-up-form__group--focused': emailFocused,
                  })}>
                  <Input
                     type="email"
                     label={emailLabel || 'Email'}
                     placeholder={emailLabel || 'Email'}
                     defaultLabel="Email"
                     handleChangeInput={handleChangeEmail}
                     inputValue={email}
                     handleFocusInput={handleFocusEmail}
                     classNameLabel="cr-sign-up-form__label"
                     classNameInput="cr-sign-up-form__input"
                     autoFocus={!isUsernameEnabled() && !isMobileDevice}
                  />
                  {emailError && <div className="cr-sign-up-form__error">{emailError}</div>}
               </div>
               {/* {renderPasswordInput()} */}
               <>
                  <Input
                     type={`${viewPass ? 'password' : 'text'}`}
                     label={passwordLabel || 'Password'}
                     placeholder={passwordLabel || 'Password'}
                     defaultLabel="Password"
                     handleChangeInput={handleChangePassword}
                     inputValue={password}
                     handleFocusInput={handleFocusPassword}
                     autoFocus={false}
                     isIcon
                     icRight={viewPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
                     handleViewPass={handleViewPass}
                  >
                     {password && (
                        <PasswordStrengthBar
                           minPasswordEntropy={minPasswordEntropy}
                           currentPasswordEntropy={currentPasswordEntropy}
                           passwordExist={password !== ''}
                           passwordErrorFirstSolved={passwordErrorFirstSolved}
                           passwordErrorSecondSolved={passwordErrorSecondSolved}
                           passwordErrorThirdSolved={passwordErrorThirdSolved}
                           passwordPopUp={passwordPopUp}
                           translate={translate}
                        />
                     )}
                  </Input>
               </>
               <div>
                  <Input
                     type={`${viewConPass ? 'password' : 'text'}`}
                     label={confirmPasswordLabel || 'Confirm Password'}
                     placeholder={confirmPasswordLabel || 'Confirm Password'}
                     defaultLabel="Confirm Password"
                     handleChangeInput={handleChangeConfirmPassword}
                     inputValue={confirmPassword}
                     handleFocusInput={handleFocusConfirmPassword}
                     classNameLabel="cr-sign-up-form__label"
                     classNameInput="cr-sign-up-form__input"
                     autoFocus={false}
                     isIcon
                     icRight={viewConPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
                     handleViewPass={handleViewConPass}
                  />
                  {
                     confirmationError && (
                        <div className="text-red-500">
                           {confirmationError}
                        </div>
                     )
                  }
               </div>
               <div
                  className={cr('cr-sign-up-form__group', {
                     'cr-sign-up-form__group--focused': refIdFocused,
                  })}>
                  <Input
                     type="text"
                     label={referalCodeLabel || 'Referral code'}
                     placeholder={referalCodeLabel || 'Referral code'}
                     defaultLabel="Referral code"
                     handleChangeInput={handleChangeRefId}
                     inputValue={refId}
                     handleFocusInput={handleFocusRefId}
                     classNameLabel="cr-sign-up-form__label"
                     classNameInput="cr-sign-up-form__input"
                     autoFocus={false}
                  />
               </div>
               <label className="checkbox" onClick={clickCheckBox}>
                  <input
                     id="agreeWithTerms"
                     className="checkbox__input"
                     type="checkbox"
                     checked={hasConfirmed}
                  />
                  <span className="checkbox__inner">
                     <span className="checkbox__tick"></span>
                     <span className="font-normal text-sm leading-[1.71429] text-[#777E90]">
                        {
                           !termsMessage ? termsMessage : (
                              <>
                                 By signing up I agree that I’m 18 years of age or older, to the <a className="checkbox__link text-[#23262F] font-medium" href="#">User Agreements</a>, <a className="checkbox__link text-[#23262F] font-medium" href="#">Privacy Policy</a>, <a className="checkbox__link text-[#23262F] font-medium" href="#">Cookie Policy</a>, <a className="checkbox__link text-[#23262F] font-medium" href="#">E-Sign Consent</a>.
                              </>
                           )
                        }
                     </span>
                  </span>
               </label>
               {renderCaptcha}
               <Button
                  type="button"
                  disabled={disableButton}
                  onClick={e => handleClick(e as any)}
                  textButton={isLoading ? 'Loading...' : labelSignUp ? labelSignUp : 'Sign up'}
                  className="-mt-1"
               />
               {isMobileDevice && renderLogIn()}
            </div>
         </form>
      </>
   );
};

export const FormRegister = memo(RegisterFormMemo);
