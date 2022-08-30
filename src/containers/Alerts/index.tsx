import React, { Component, FunctionComponent } from 'react';
import FadeIn from 'react-fade-in';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../../';
import {
   alertDelete,
   alertDeleteByIndex,
   AlertState,
   RootState,
   selectAlertState,
} from 'modules';
import toast, { Toaster } from 'react-hot-toast';

interface ReduxProps {
   alerts: AlertState;
}

interface DispatchProps {
   alertDelete: typeof alertDelete;
   alertDeleteByIndex: typeof alertDeleteByIndex;
}

type Props = ReduxProps & DispatchProps & IntlProps;

class AlertComponent extends Component<Props> {
   public deleteAlertByIndex = (key: number) => this.props.alertDeleteByIndex(key);

   public translate = (id: string) => id ? this.props.intl.formatMessage({ id }) : '';

   public notify = (msg: string, type: string): string => `${type === 'error' ? toast.error(msg) : toast.success(msg)}`;

   public render() {
      return (
         <>
            {
               this.props.alerts.alerts.map(w => w.message.map((msg, index) => (
                  <FadeIn key={index}>
                     <div className="hidden" onClick={() => this.deleteAlertByIndex(index)}>
                        {
                           this.notify(
                              `${this.translate(msg)} ${(w.code && w.code.toString(10)) === undefined ? '' : w.code && w.code.toString(10)}`,
                              `${w.type === 'error' ? 'error' : w.type}`
                           )
                        }
                     </div>
                  </FadeIn>
               )))
            }
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
         </>
      );
   }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   alerts: selectAlertState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   alertDelete: () => dispatch(alertDelete()),
   alertDeleteByIndex: payload => dispatch(alertDeleteByIndex(payload)),
});

export const Alerts = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(
      AlertComponent
   )) as FunctionComponent;
