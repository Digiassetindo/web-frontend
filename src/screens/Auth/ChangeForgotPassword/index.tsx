import React, { Component, ComponentClass } from 'react';
import { injectIntl } from 'react-intl';
import {
   connect,
   MapDispatchToPropsFunction,
   MapStateToProps,
} from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../..';
import { FormChangeNewPassword, LayoutAuth } from 'components';
import { setDocumentTitle } from 'helpers';
import {
   changeForgotPasswordFetch,
   changeLanguage,
   Configs,
   entropyPasswordFetch,
   RootState, selectChangeForgotPasswordSuccess,
   selectConfigs,
   selectCurrentPasswordEntropy,
   selectMobileDeviceState,
} from 'modules';

interface ChangeForgottenPasswordState {
   confirmToken: string;
}

interface ReduxProps {
   changeForgotPassword?: boolean;
   isMobileDevice: boolean;
   configs: Configs;
   currentPasswordEntropy: number;
}

interface DispatchProps {
   changeForgotPasswordFetch: typeof changeForgotPasswordFetch;
   changeLanguage: typeof changeLanguage;
   fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
}

interface HistoryProps {
   history: {
      location: {
         search: string;
      };
   };
}

type Props = RouterProps & DispatchProps & HistoryProps & ReduxProps & IntlProps;

class ChangeForgotPasswordClass extends Component<Props, ChangeForgottenPasswordState> {
   constructor(props: Props) {
      super(props);

      this.state = {
         confirmToken: '',
      };
   }

   public componentDidMount() {
      setDocumentTitle('Change forgotten password');
      const { history } = this.props;
      const token = new URLSearchParams(history.location.search).get('reset_token');
      const lang = new URLSearchParams(history.location.search).get('lang');
      if (token) {
         this.setState({
            confirmToken: token,
         });
      }
      if (lang) {
         this.props.changeLanguage(lang.toLowerCase());
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (next.changeForgotPassword && (!this.props.changeForgotPassword)) {
         this.props.history.push('/login');
      }
   }

   public render() {
      const { isMobileDevice, configs, currentPasswordEntropy } = this.props;

      return (
         <LayoutAuth
            txtHeader="Don’t have an account?"
            to="/register"
            toTxt="Register for free"
         >
            <FormChangeNewPassword
               handleChangePassword={this.handleSendNewPassword}
               title={!isMobileDevice && this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.title' })}
               configs={configs}
               currentPasswordEntropy={currentPasswordEntropy}
               fetchCurrentPasswordEntropy={this.props.fetchCurrentPasswordEntropy}
               hideOldPassword={true}
            />
         </LayoutAuth>
      );
   }

   private handleSendNewPassword = payload => {
      const { confirmToken } = this.state;
      this.props.changeForgotPasswordFetch({
         ...payload,
         reset_password_token: confirmToken,
      });
   };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
   changeForgotPassword: selectChangeForgotPasswordSuccess(state),
   isMobileDevice: selectMobileDeviceState(state),
   currentPasswordEntropy: selectCurrentPasswordEntropy(state),
   configs: selectConfigs(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   changeForgotPasswordFetch: credentials => dispatch(changeForgotPasswordFetch(credentials)),
   changeLanguage: lang => dispatch(changeLanguage(lang)),
   fetchCurrentPasswordEntropy: payload => dispatch(entropyPasswordFetch(payload)),
});

export const ChangeForgotPassword = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps),
)(ChangeForgotPasswordClass) as ComponentClass;
