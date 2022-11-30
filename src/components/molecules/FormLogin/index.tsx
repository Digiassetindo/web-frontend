// import cr from 'classnames';
import React, { KeyboardEvent, useCallback, useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { Input, Button } from 'components';
import { captchaLogin } from '../../../api';
import { EMAIL_REGEX } from '../../../helpers';
import { GeetestCaptchaResponse } from '../../../modules';
import { selectMobileDeviceState } from '../../../modules/public/globalSettings';

import { IcEye, IcEyeClose, icLogoDark, icLogoLight, ilusLogin, imgQRCode } from 'assets';
import { Link } from 'react-router-dom';

export interface SignInProps {
   labelSignIn?: string;
   labelSignUp?: string;
   emailLabel?: string;
   passwordLabel?: string;
   receiveConfirmationLabel?: string;
   forgotPasswordLabel?: string;
   isLoading?: boolean;
   title?: string;
   onForgotPassword: (email?: string) => void;
   onConfirmationResend?: (email?: string) => void;
   onSignUp: () => void;
   onSignIn: () => void;
   className?: string;
   image?: string;
   email: string;
   emailError: string;
   password: string;
   passwordError: string;
   emailFocused: boolean;
   emailPlaceholder: string;
   passwordFocused: boolean;
   passwordPlaceholder: string;
   isFormValid: () => void;
   refreshError: () => void;
   handleChangeFocusField: (value: string) => void;
   changePassword: (value: string) => void;
   changeEmail: (value: string) => void;
   captchaType?: 'recaptcha' | 'geetest' | 'none';
   renderCaptcha?: JSX.Element | null;
   reCaptchaSuccess?: boolean;
   geetestCaptchaSuccess?: boolean;
   captcha_response?: string | GeetestCaptchaResponse;
}

const SignIn: React.FC<SignInProps> = ({
   email,
   emailError,
   emailPlaceholder,
   password,
   passwordError,
   passwordPlaceholder,
   isLoading,
   onSignUp,
   image,
   labelSignIn,
   labelSignUp,
   emailLabel,
   passwordLabel,
   emailFocused,
   passwordFocused,
   onForgotPassword,
   forgotPasswordLabel,
   refreshError,
   onSignIn,
   isFormValid,
   handleChangeFocusField,
   changePassword,
   changeEmail,
   captchaType,
   geetestCaptchaSuccess,
   reCaptchaSuccess,
   renderCaptcha,
}) => {
   const [viewPass, setViewPass] = useState<boolean>(true);
   const [scanToLogin, setScanToLogin] = useState<boolean>(false);
   const handleViewPass = () => setViewPass(!viewPass);
   const handleScanToLogin = () => setScanToLogin(!scanToLogin);

   const isMobileDevice = useSelector(selectMobileDeviceState);
   // const history = useHistory();
   // const { formatMessage } = useIntl();

   const isValidForm = useCallback(() => {
      const isEmailValid = email.match(EMAIL_REGEX);

      return email && isEmailValid && password;
   }, [email, password]);

   const handleChangeEmail = useCallback(
      (value: string) => {
         changeEmail(value);
      },
      [changeEmail]
   );

   const handleChangePassword = useCallback(
      (value: string) => {
         changePassword(value);
      },
      [changePassword]
   );

   const handleFieldFocus = useCallback(
      (field: string) => {
         handleChangeFocusField(field);
      },
      [handleChangeFocusField]
   );

   const isButtonDisabled = (): boolean => {
      return ((captchaLogin() && captchaType !== 'none' && !reCaptchaSuccess && !geetestCaptchaSuccess)) ? true : false;
   };

   const handleSubmitForm = useCallback(() => {
      refreshError();
      onSignIn();
   }, [onSignIn, refreshError]);

   const handleValidateForm = useCallback(() => {
      isFormValid();
   }, [isFormValid]);

   const handleClick = useCallback(
      (e?: MouseEvent) => {
         if (e) {
            e.preventDefault();
         }
         if (!isValidForm()) {
            handleValidateForm();
         } else {
            handleSubmitForm();
         }
      },
      [handleSubmitForm, handleValidateForm, isValidForm]
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

   // const renderForgotButton = React.useMemo(
   //    () => (
   //       <div className="cr-sign-in-form__bottom-section">
   //          <div className="cr-sign-in-form__bottom-section-password" onClick={() => onForgotPassword(email)}>
   //             {forgotPasswordLabel || 'Forgot your password?'}
   //          </div>
   //       </div>
   //    ),
   //    [forgotPasswordLabel, onForgotPassword, email]
   // );

   // const renderRegister = React.useMemo(
   //    () => (
   //       <div className="pg-sign-in-screen__register">
   //          <span>
   //             {formatMessage({ id: 'page.header.signIN.noAccountYet' })}
   //             <span onClick={() => history.push('/signup')} className="pg-sign-in-screen__register-button">
   //                {formatMessage({ id: 'page.body.landing.header.button3' })}
   //             </span>
   //          </span>
   //       </div>
   //    ),
   //    [formatMessage, history]
   // );

   return (
      <>
         <div className="relative flex-shrink-0 w-[420px] xl:w-[512px] min-h-screen bg-[#23262F] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${ilusLogin})`, backgroundPosition: '100% 50%' }}>
            <Link to='/' className="login__logo">
               <img src={icLogoLight} alt="Digiasset" />
               <img src={icLogoDark} alt="Digiasset" />
            </Link>
         </div>
         <div className="login__col">
            <div className="login__head">Don’t have an account? <Link className="login__link" to="/register">Register for free</Link>
            </div>
            <div className="login__wrap">
               <div className="entry">
                  <div className="mb-10 text-center text-4xl font-dm font-bold text-[#23262f]">Login to Digiasset</div>
                  {
                     !scanToLogin ? (
                        <form>
                           <div onKeyPress={handleEnterPress}>
                              <div className="flex flex-col space-y-8">
                                 <Input
                                    type="email"
                                    label={emailLabel || 'Email'}
                                    placeholder={emailPlaceholder}
                                    defaultLabel="Email"
                                    handleChangeInput={handleChangeEmail}
                                    inputValue={email}
                                    handleFocusInput={() => handleFieldFocus('email')}
                                    autoFocus={!isMobileDevice}
                                 />
                                 <Input
                                    type={viewPass ? 'password' : 'text'}
                                    label={passwordLabel || 'Password'}
                                    placeholder={passwordPlaceholder}
                                    defaultLabel="Password"
                                    handleChangeInput={handleChangePassword}
                                    inputValue={password}
                                    handleFocusInput={() => handleFieldFocus('password')}
                                    autoFocus={false}
                                    isIcon
                                    icRight={viewPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
                                    handleViewPass={handleViewPass}
                                 />
                              </div>
                              <div className="flex justify-between items-center mt-4 text-xs leading-[1.66667] font-semibold">
                                 <button onClick={handleScanToLogin} className="text-[#777E90] hover:text-[#23262F] transition-colors duration-300" type="button">Scan to login</button>
                                 <Link to="/forgot_password" className="text-[#3772FF] hover:text-[#044eff] transition-colors duration-300">Forgot password?</Link>
                              </div>
                              <Button
                                 disabled={isLoading || !email.match(EMAIL_REGEX) || !password || isButtonDisabled()}
                                 textButton={isLoading ? 'Loading...' : labelSignIn ? labelSignIn : 'Login'}
                                 onClick={handleClick as any}
                              />
                           </div>
                        </form>
                     ) : (
                        <div className="block">
                           <div className="entry__box">
                              <div className="entry__details">
                                 <div className="entry__code">
                                    <img src={imgQRCode} alt="Qr code" />
                                 </div>
                                 <a
                                    href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Download app"
                                    className="button-stroke entry__button mt-12">
                                    Download app
                                 </a>
                              </div>
                           </div>
                        </div>
                     )
                  }

               </div>
            </div>
         </div>
      </>
   );
};

export const FormLogin = React.memo(SignIn);


{/* <form>
<div className="cr-sign-in-form" onKeyPress={handleEnterPress}>
   {!isMobileDevice && (
      <div className="cr-sign-in-form__options-group">
         <div className="cr-sign-in-form__option">
            <div className="cr-sign-in-form__option-inner __selected">
               {labelSignIn ? labelSignIn : 'Login'}
            </div>
         </div>
         <div className="cr-sign-in-form__option">
            <div
               className="cr-sign-in-form__option-inner cr-sign-in-form__tab-signup"
               onClick={onSignUp}>
               {labelSignUp ? labelSignUp : 'Sign Up'}
            </div>
         </div>
      </div>
   )}
   <div className="cr-sign-in-form__form-content">
      {image ? (
         <h1 className="cr-sign-in-form__title">
            <img className="cr-sign-in-form__image" src={image} alt="logo" />
         </h1>
      ) : null}
      <div
         className={cr('cr-sign-in-form__group', {
            'cr-sign-in-form__group--focused': emailFocused,
         })}>
         <Input
            type="email"
            label={emailLabel || 'Email'}
            placeholder={emailPlaceholder}
            defaultLabel="Email"
            handleChangeInput={handleChangeEmail}
            inputValue={email}
            handleFocusInput={() => handleFieldFocus('email')}
            autoFocus={!isMobileDevice}
         />
         {emailError && <div className={'cr-sign-in-form__error'}>{emailError}</div>}
      </div>
      <div
         className={cr('cr-sign-in-form__group', {
            'cr-sign-in-form__group--focused': passwordFocused,
         })}>
         <Input
            type="password"
            label={passwordLabel || 'Password'}
            placeholder={passwordPlaceholder}
            defaultLabel="Password"
            handleChangeInput={handleChangePassword}
            inputValue={password}
            handleFocusInput={() => handleFieldFocus('password')}
            autoFocus={false}
         />
         {passwordError && <div className={'cr-sign-in-form__error'}>{passwordError}</div>}
      </div>
      {captchaLogin() && renderCaptcha}
      {isMobileDevice && renderForgotButton}
      <div className="cr-sign-in-form__button-wrapper">
         <Button
            block={true}
            type="button"
            disabled={isLoading || !email.match(EMAIL_REGEX) || !password || isButtonDisabled()}
            onClick={handleClick as any}
            size="lg"
            variant="primary">
            {isLoading ? 'Loading...' : labelSignIn ? labelSignIn : 'Sign in'}
         </Button>
      </div>
      {!isMobileDevice && renderForgotButton}
      {isMobileDevice && renderRegister}
   </div>
</div>
</form> */}
