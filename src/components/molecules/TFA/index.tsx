import cr from 'classnames';
import React, { FC, memo } from 'react';
import { Button, LayoutAuth, FormHeader, InputOtpNew } from 'components';
// import OtpInput from 'react-otp-input';

export interface TwoFactorAuthProps {
   errorMessage?: string;
   isLoading?: boolean;
   onSubmit: () => void;
   title: string;
   label: string;
   buttonLabel: string;
   message?: string;
   otpCode: string;
   error: string;
   codeFocused: boolean;
   handleOtpCodeChange: (otp: string) => void;
   handleChangeFocusField: () => void;
   handleClose2fa?: () => void;
}

const TFAMemo: FC<TwoFactorAuthProps> = ({
   errorMessage,
   isLoading,
   title,
   label,
   buttonLabel,
   message,
   error,
   otpCode,
   codeFocused,
   onSubmit,
   handleOtpCodeChange,
   handleChangeFocusField,
   handleClose2fa,
}) => {
   // const handleEnterPress = useCallback(
   //    (event: KeyboardEvent<HTMLInputElement>) => {
   //       if (event.key === 'Enter') {
   //          event.preventDefault();

   //          if (!isLoading && otpCode.match(`^[0-9]{6}$`)) {
   //             onSubmit();
   //          }
   //       }
   //    },
   //    [onSubmit, otpCode, isLoading]
   // );
   // const [coba, setCoba] = useState('');
   return (
      <>
         <LayoutAuth>
            <FormHeader title={title || '2FA verification'} subTitle="Please enter 6 Digits authentication code from your App" />
            <form>
               <div
               className={cr('cr-email-form__group', {
                  'cr-email-form__group--focused': codeFocused,
               })}>
               <InputOtpNew
                  valueLength={6}
                  value={otpCode}
                  onChange={handleOtpCodeChange}
               />
               {/* <OTPInput
                  autoFocus
                  length={6}
                  className="flex  mb-8 -mx-2 bg-neutral8"
                  onChangeOTP={e => setCoba(e)}

               /> */}
               {/* <OtpInput
                  value={otpCode}
                  onChange={handleOtpCodeChange}
                  separator={<div className="w-full rounded-lg h-1 bg-[#ccd9fe]"></div>}
                  numInputs={6}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  containerStyle="justify-between flex -mt-16 mb-8 -mx-2 bg-neutral8"
                  className="flex-grow-0 flex-shrink-0 basis-[calc(16.6667%-16px)] w-[calc(16.6667%-16px)] my-0 mx-2"
                  inputStyle="w-full h-16 text-center font-dm text-[32px] font-semibold text-[#23262F] bg-neutral8 transition-all duration-300"
                  // inputStyle={{
                  //    border: "1px solid transparent",
                  //    borderRadius: "8px",
                  //    width: "54px",
                  //    height: "54px",
                  //    fontSize: "12px",
                  //    color: "#000",
                  //    fontWeight: "400",
                  //    caretColor: "blue"
                  // }}
                  errorStyle={{ color: "#f00", fontSize: "12px" }}
                  focusStyle={{
                     border: "1px solid #CFD3DB",
                     outline: "none"
                  }}
                  /> */}
               {/* <Input
                  type="number"
                  label={label || '6-digit Google Authenticator Code'}
                  placeholder={label || '6-digit Google Authenticator Code'}
                  defaultLabel="6-digit Google Authenticator Code"
                  handleChangeInput={handleOtpCodeChange}
                  inputValue={otpCode}
                  handleFocusInput={handleChangeFocusField}
                  classNameLabel="cr-email-form__label"
                  classNameInput="cr-email-form__input"
                  onKeyPress={handleEnterPress}
                  autoFocus={true}
               /> */}
               {errorMessage && <div className="cr-email-form__error">{errorMessage}</div>}
            </div>
               <div
                  className={cr('cr-email-form__button-wrapper', {
                     'cr-email-form__button-wrapper--empty': !(errorMessage || error),
                  })}>
                  <Button
                     disabled={isLoading || !otpCode.match(`^[0-9]{6}$`)}
                     onClick={onSubmit}
                     textButton={isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Login'}
                     type="button"
                  />
               </div>
            </form>
         </LayoutAuth>
      </>
   );
};

export const TFA = memo(TFAMemo);
