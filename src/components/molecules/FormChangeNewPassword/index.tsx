import cr from 'classnames';
import React, { useState, memo, KeyboardEvent } from 'react';
import { useIntl } from 'react-intl';
import { PasswordStrengthBar } from '../../';
import {
   PASSWORD_REGEX,
   passwordErrorFirstSolution,
   passwordErrorSecondSolution,
   passwordErrorThirdSolution,
} from 'helpers';
import { Input, Button } from 'components';
import { IcEye, IcEyeClose } from 'assets';

export const FormChangeNewPasswordMemo = (props: any) => {
   const [viewPass, setViewPass] = useState<boolean>(true);
   const [viewConPass, setViewConPass] = useState<boolean>(true)
   const handleViewPass = () => setViewPass(!viewPass);
   const handleViewConPass = () => setViewConPass(!viewConPass);

   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmationPassword, setConfirmationPassword] = useState('');
   const [oldPasswordFocus, setOldPasswordFocus] = useState(false);
   const [newPasswordFocus, setNewPasswordFocus] = useState(false);
   const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
   const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = useState(false);
   const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = useState(false);
   const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = useState(false);
   const [passwordPopUp, setPasswordPopUp] = useState(false);

   const intl = useIntl();

   const handleChangePassword = () => {
      const payload = props.hideOldPassword
         ? {
            password: newPassword,
            confirm_password: confirmationPassword,
         } : {
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmationPassword,
         };

      props.handleChangePassword(payload);

      setOldPassword('');
      setNewPassword('');
      setConfirmationPassword('');
      setOldPasswordFocus(false);
      setNewPasswordFocus(false);
      setConfirmPasswordFocus(false);
   };

   const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
         event.preventDefault();

         if (isValidForm()) {
            handleChangePassword();
         }
      }
   };

   const handleChangeNewPassword = (value: string) => {
      if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
         setPasswordErrorFirstSolved(true);
      } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
         setPasswordErrorFirstSolved(false);
      }

      if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
         setPasswordErrorSecondSolved(true);
      } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
         setPasswordErrorSecondSolved(false);
      }

      if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
         setPasswordErrorThirdSolved(true);
      } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
         setPasswordErrorThirdSolved(false);
      }

      setNewPassword(value);
      setTimeout(() => {
         props.fetchCurrentPasswordEntropy({ password: value });
      }, 500);
   };

   const handleFocusNewPassword = () => {
      setNewPasswordFocus(!newPassword);
      setPasswordPopUp(!passwordPopUp);
   };

   const translate = (key: string) => intl.formatMessage({ id: key });

   const isValidForm = () => {
      const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
      const isConfirmPasswordValid = newPassword === confirmationPassword;
      const isOldPasswordValid = (!props.hideOldPassword && oldPassword) || true;

      return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
   };

   const renderHeader = () => (
      <div className="pb-8 mb-8 border-b border-solid border-[#E6E8EC]">
         <div className="mb-8 text-center text-[40px] leading-[1.2] tracking-[-.01em] font-dm font-bold text-[#23262f]">
            {props.title}
         </div>
         {
            props.subTitle && (
               <div className="text-center text-xs leading-[1.66667] text-[#777E90]">
                  {props.subTitle}
               </div>
            )
         }
      </div>
   );

   const renderBody = () => {
      const oldPasswordClass = cr('cr-email-form__group', {
         'cr-email-form__group--focused': oldPasswordFocus,
      });

      const newPasswordClass = cr('cr-email-form__group', {
         'cr-email-form__group--focused': newPasswordFocus,
      });

      const confirmPasswordClass = cr('cr-email-form__group', {
         'cr-email-form__group--focused': confirmPasswordFocus,
      });

      return (
         <div className="space-y-8" onKeyPress={handleEnterPress}>
            {!props.hideOldPassword &&
               <div className={oldPasswordClass}>
                  <Input
                     type="password"
                     label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' })}
                     placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.old' })}
                     defaultLabel="Old password"
                     handleChangeInput={setOldPassword}
                     inputValue={oldPassword}
                     handleFocusInput={() => setOldPasswordFocus(!oldPasswordFocus)}
                     classNameLabel="cr-email-form__label"
                     classNameInput="cr-email-form__input"
                     autoFocus={true}
                  />
               </div>
            }
            <div className={newPasswordClass}>
               <Input
                  type={`${viewPass ? 'password' : 'text'}`}
                  label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                  placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                  defaultLabel="New password"
                  handleChangeInput={handleChangeNewPassword}
                  inputValue={newPassword}
                  handleFocusInput={handleFocusNewPassword}
                  classNameLabel="cr-email-form__label"
                  classNameInput="cr-email-form__input"
                  autoFocus
                  isIcon
                  icRight={viewPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
                  handleViewPass={handleViewPass}
               />
               {newPassword ?
                  <PasswordStrengthBar
                     minPasswordEntropy={props.configs.password_min_entropy}
                     currentPasswordEntropy={props.currentPasswordEntropy}
                     passwordExist={newPassword !== ''}
                     passwordErrorFirstSolved={passwordErrorFirstSolved}
                     passwordErrorSecondSolved={passwordErrorSecondSolved}
                     passwordErrorThirdSolved={passwordErrorThirdSolved}
                     passwordPopUp={passwordPopUp}
                     translate={translate}
                  /> : null}
            </div>
            <div className={confirmPasswordClass}>
               <Input
                  type={`${viewConPass ? 'password' : 'text'}`}
                  label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
                  placeholder={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
                  defaultLabel="Password confirmation"
                  handleChangeInput={setConfirmationPassword}
                  inputValue={confirmationPassword}
                  handleFocusInput={() => setConfirmPasswordFocus(!confirmPasswordFocus)}
                  classNameLabel="cr-email-form__label"
                  classNameInput="cr-email-form__input"
                  autoFocus={false}
                  isIcon
                  icRight={viewConPass ? <IcEye className="w-6 h-6 inline-block cursor-pointer" /> : <IcEyeClose className="w-6 h-6 inline-block cursor-pointer" />}
                  handleViewPass={handleViewConPass}
               />
            </div>
         </div>
      );
   };

   const renderFooter = () => {
      return <Button
         type="submit"
         disabled={!isValidForm()}
         onClick={handleChangePassword}
         textButton={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.button.change' })}
      />
   };

   return (
      <div className="pg-mobile-change-password">
         {props.title && renderHeader()}
         <div className="pg-mobile-change-password__wrapper">
            {renderBody()}
            {renderFooter()}
         </div>
      </div>
   );
};

export const FormChangeNewPassword = memo(FormChangeNewPasswordMemo);
