import { History } from 'history';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { FormHeader, LayoutAuth, OTPInput } from 'components';
import { EMAIL_REGEX, setDocumentTitle } from 'helpers';
import {
   Configs,
   emailVerificationFetch,
   GeetestCaptchaResponse,
   resetCaptchaState,
   RootState,
   selectCaptchaResponse,
   selectConfigs,
   selectCurrentLanguage,
   selectGeetestCaptchaSuccess,
   selectMobileDeviceState,
   selectRecaptchaSuccess,
   selectSendEmailVerificationError,
   selectSendEmailVerificationLoading,
   selectSendEmailVerificationSuccess,
   selectUserInfo,
   User,
} from 'modules';
import { CommonError } from 'modules/types';

interface OwnProps {
   history: History;
   location: {
      state: {
         email: string;
      };
   };
   success: boolean;
   error?: CommonError;
}

interface DispatchProps {
   emailVerificationFetch: typeof emailVerificationFetch;
   resetCaptchaState: typeof resetCaptchaState;
}

interface ReduxProps {
   emailVerificationLoading: boolean;
   isMobileDevice: boolean;
   configs: Configs;
   captcha_response?: string | GeetestCaptchaResponse;
   reCaptchaSuccess: boolean;
   geetestCaptchaSuccess: boolean;
   user: User;
}

type Props = DispatchProps & ReduxProps & OwnProps & IntlProps;

const EmailVerificationComponent = (props: Props) => {
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

   useEffect(() => {
      setDocumentTitle('Email verification');
      if (!props.location.state) {
         props.history.push('/login');
      }
   }, []);

   // const translate = (id: string) => props.intl.formatMessage({ id });

   // const renderCaptcha = () => {
   //    const { error, success } = props;
   //    return <Captcha error={error} success={success} />;
   // };

   const handleClick = () => {
      const { configs, captcha_response } = props;
      switch (configs.captcha_type) {
         case 'recaptcha':
         case 'geetest':
            props.emailVerificationFetch({
               email: props.location.state.email,
               captcha_response,
            });
            break;
         default:
            props.emailVerificationFetch({
               email: props.location.state.email,
            });
            break;
      }
      props.resetCaptchaState();
      setInitialSeconds(60);
   };

   const disableButton = (): boolean => {
      const {
         configs,
         location,
         geetestCaptchaSuccess,
         reCaptchaSuccess,
      } = props;
      if (location.state && location.state.email && !location.state.email.match(EMAIL_REGEX)) {
         return true;
      }
      if (configs.captcha_type === 'recaptcha' && !reCaptchaSuccess) {
         return true;
      }
      if (configs.captcha_type === 'geetest' && !geetestCaptchaSuccess) {
         return true;
      }
      return false;
   };

   const {
      // emailVerificationLoading,
      // isMobileDevice
   } = props;

   const title = props.intl.formatMessage({ id: 'page.header.signUp.modal.header' });
   const text = props.intl.formatMessage({ id: 'page.header.signUp.modal.body' });
   const button = props.intl.formatMessage({ id: 'page.resendConfirmation' });

   return (
      <>
         <LayoutAuth
            txtHeader="Already have an account?"
            to="/login" toTxt="Login"
         >
            <FormHeader
               title={title}
               subTitle={text}
            />
            <OTPInput
               className="flex mb-8 -mx-2 bg-neutral8"
               onChangeOTP={otp => console.log(`OTP => : ${otp}`)}
            />
            <div className="login__btns">
               {
                  minutes === 0 && seconds === 0
                     ? (
                        <button onClick={handleClick} className="button-stroke button-small login__button" disabled={disableButton()}>{button || 'Resend Code'}</button>
                     )
                     : (<div> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>)
               }
               <button className="button button-small login__button">Continue</button>
            </div>
         </LayoutAuth>
         <>
            {/* {!isMobileDevice && <div className="pg-emailverification-title">{title}</div>}
                     <div className="pg-emailverification-body">
                        <div className="pg-emailverification-body-text">{text}</div>
                        {this.renderCaptcha()}
                        {
                           !isMobileDevice && (
                              <div className="pg-emailverification-body-container">
                                 {emailVerificationLoading ? <Spinner animation="border" variant="primary" /> :
                                    <button className="pg-emailverification-body-container-button"
                                       onClick={this.handleClick}
                                       disabled={this.disableButton()}>{button}</button>}
                              </div>)
                        }
                        {isMobileDevice &&
                           (<div className="pg-emailverification-body-container">
                              <Button
                                 block={true}
                                 type="button"
                                 onClick={this.handleClick}
                                 size="lg"
                                 variant="primary"
                              >
                                 {this.props.intl.formatMessage({ id: 'page.mobile.reset.header' })}
                              </Button>
                           </div>)
                        }
                     </div> */}
         </>
      </>
   );
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   emailVerificationLoading: selectSendEmailVerificationLoading(state),
   i18n: selectCurrentLanguage(state),
   isMobileDevice: selectMobileDeviceState(state),
   configs: selectConfigs(state),
   error: selectSendEmailVerificationError(state),
   success: selectSendEmailVerificationSuccess(state),
   captcha_response: selectCaptchaResponse(state),
   reCaptchaSuccess: selectRecaptchaSuccess(state),
   geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
   user: selectUserInfo(state),
});

const mapDispatchToProps = {
   emailVerificationFetch,
   resetCaptchaState,
};

export const EmailVerification = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(EmailVerificationComponent) as FunctionComponent;
