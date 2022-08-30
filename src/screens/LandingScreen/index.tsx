import * as React from 'react';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../';
import {
   icLogoDark,
   icLogoLight,
   ilusCard11,
   ilusCard12,
   ilusCard21,
   ilusCard22,
   ilusCard31,
   ilusCard32,
   ilusNews11,
   ilusNews12
} from 'assets';
import { Header, Footer as FooterNew, Hero, Learn, Download, Step, MyMarketsTable } from 'components';
import { toggleColorTheme } from 'helpers';
// import { LogoIcon } from '../../assets/images/LogoIcon';
// import { MarketsTable } from '../../containers';
import {
   RootState,
   selectCurrentColorTheme,
   selectUserLoggedIn,
} from 'modules';
import Slider from 'react-slick';

const FeaturesExchangeIcon = require('../../assets/images/landing/features/Exchange.svg');
const FeaturesTypesIcon = require('../../assets/images/landing/features/Types.svg');
const FeaturesCustomizeIcon = require('../../assets/images/landing/features/Customize.svg');
const FeaturesSecurityIcon = require('../../assets/images/landing/features/Security.svg');
const FeaturesCommunityIcon = require('../../assets/images/landing/features/Community.svg');
const FeaturesAPIIcon = require('../../assets/images/landing/features/API.svg');

// const TelegramIcon = require('../../assets/images/landing/social/Telegram.svg');
// const LinkedInIcon = require('../../assets/images/landing/social/LinkedIn.svg');
// const TwitterIcon = require('../../assets/images/landing/social/Twitter.svg');
// const YouTubeIcon = require('../../assets/images/landing/social/YouTube.svg');
// const RedditIcon = require('../../assets/images/landing/social/Reddit.svg');
// const FacebookIcon = require('../../assets/images/landing/social/Facebook.svg');
// const MediumIcon = require('../../assets/images/landing/social/Medium.svg');
// const CoinMarketIcon = require('../../assets/images/landing/social/CoinMarket.svg');


interface ReduxProps {
   isLoggedIn: boolean;
   colorTheme: string;
}

type Props = ReduxProps & RouteProps & IntlProps;

class Landing extends React.Component<Props> {
   public componentDidMount() {
      if (this.props.colorTheme === 'light') {
         toggleColorTheme('dark');
      }
   }

   public componentWillReceiveProps(next: Props) {
      if (next.colorTheme === 'light') {
         toggleColorTheme('dark');
      }
   }

   public componentWillUnmount() {
      if (this.props.colorTheme === 'light') {
         toggleColorTheme(this.props.colorTheme);
      }
   }

   public renderHeader() {
      return (
         <Header
            isFull={true}
            isLogined={this.props.isLoggedIn}
            txtSignup={this.translate('page.body.landing.header.button3') ?? 'Register'}
            txtLogin={this.translate('page.body.landing.header.button2') ?? 'Login'}
         />
      );
   }

   public renderMarketInfoBlock() {
      return (
         <div className="pg-landing-screen__market-info">
            <div className="pg-landing-screen__market-info__wrap">
               <div className="pg-landing-screen__market-info__wrap__title">
                  <h1>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                  <h1>{this.translate('page.body.landing.marketInfo.title.text2')}</h1>
                  <Link to="/trading" className="landing-button">
                     {this.translate('page.body.landing.marketInfo.title.button')}
                  </Link>
               </div>
               {/* <MyMarketsTable /> */}
            </div>
         </div>
      );
   }

   public renderPlatformInfoBlock() {
      return (
         <div className="pg-landing-screen__platform-info">
            <div className="pg-landing-screen__platform-info__wrap">
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.first.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.first.title')}</span>
               </div>
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.second.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.second.title')}</span>
               </div>
               <div className="pg-landing-screen__platform-info__wrap__item">
                  <span>{this.translate('page.body.landing.platformInfo.item.third.value')}</span>
                  <span>{this.translate('page.body.landing.platformInfo.item.third.title')}</span>
               </div>
            </div>
         </div>
      );
   }

   public renderRegisterBlock() {
      return (
         <div className="pg-landing-screen__register">
            <div className="pg-landing-screen__register__wrap">
               <div className="pg-landing-screen__register__wrap__item">
                  <h1>{this.translate('page.body.landing.register.item.title')}</h1>
                  <h2>{this.translate('page.body.landing.register.item.text')}</h2>
                  <Link to="/signup" className="landing-button">
                     {this.translate('page.body.landing.register.item.button')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderFeaturesBlock() {
      return (
         <div className="pg-landing-screen__features">
            <div className="pg-landing-screen__features__wrap">
               <h1>{this.translate('page.body.landing.features.title')}</h1>
               <div className="pg-landing-screen__features__content">
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesExchangeIcon}
                           alt={this.translate('page.body.landing.features.features.item1.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item1.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item1.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesTypesIcon}
                           alt={this.translate('page.body.landing.features.features.item2.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item2.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item2.text')}</span>
                     </div>
                  </div>
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesCustomizeIcon}
                           alt={this.translate('page.body.landing.features.features.item3.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item3.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item3.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesSecurityIcon}
                           alt={this.translate('page.body.landing.features.features.item4.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item4.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item4.text')}</span>
                     </div>
                  </div>
                  <div className="pg-landing-screen__features__content__row">
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesCommunityIcon}
                           alt={this.translate('page.body.landing.features.features.item5.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item5.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item5.text')}</span>
                     </div>
                     <div className="pg-landing-screen__features__content__row__item">
                        <img
                           src={FeaturesAPIIcon}
                           alt={this.translate('page.body.landing.features.features.item6.title')}
                        />
                        <h2>{this.translate('page.body.landing.features.features.item6.title')}</h2>
                        <span>{this.translate('page.body.landing.features.features.item6.text')}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   public renderTradeOnTheGoBlock() {
      return (
         <div className="pg-landing-screen__trade-on-the-go">
            <div className="pg-landing-screen__trade-on-the-go__wrap">
               <div className="pg-landing-screen__trade-on-the-go__wrap__image" />
               <div className="pg-landing-screen__trade-on-the-go__wrap__content">
                  <h1>{this.translate('page.body.landing.tradeOnTheGo.item.title')}</h1>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text1')}</h2>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text2')}</h2>
                  <h2>{this.translate('page.body.landing.tradeOnTheGo.item.text3')}</h2>
                  <Link to="/trading/" className="landing-button">
                     {this.translate('page.body.landing.tradeOnTheGo.item.button')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderStartTradingBlock() {
      return (
         <div className="pg-landing-screen__start-trading">
            <div className="pg-landing-screen__start-trading__wrap">
               <h1>{this.translate('page.body.landing.startTrading.title')}</h1>
               <div className="pg-landing-screen__start-trading__wrap__content">
                  <Link to="/signup" className="landing-button">
                     {this.translate('page.body.landing.startTrading.button1')}
                  </Link>
                  <Link to="/trading/" className="landing-button landing-button--secondary">
                     {this.translate('page.body.landing.startTrading.button2')}
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   public renderFooter() {
      return (
         <>
            <FooterNew />
            {/* <div className="pg-landing-screen__footer">
                  <div className="pg-landing-screen__footer__wrap">
                     <div className="pg-landing-screen__footer__wrap__left" onClick={e => this.handleScrollTop()}>
                           <LogoIcon />
                     </div>
                     <div className="pg-landing-screen__footer__wrap__navigation">
                           <div className="pg-landing-screen__footer__wrap__navigation__col">
                              <Link to="/trading/">{this.translate('page.body.landing.footer.exchange')}</Link>
                              <Link to="/wallets">{this.translate('page.body.landing.footer.wallets')}</Link>
                              <Link to="/">{this.translate('page.body.landing.footer.fees')}</Link>
                           </div>
                           <div className="pg-landing-screen__footer__wrap__navigation__col">
                              <Link to="/">{this.translate('page.body.landing.footer.faq')}</Link>
                              <Link to="/">{this.translate('page.body.landing.footer.support')}</Link>
                              <Link to="/">{this.translate('page.body.landing.footer.privacy')}</Link>
                           </div>
                           <div className="pg-landing-screen__footer__wrap__navigation__col">
                              <Link to="/">{this.translate('page.body.landing.footer.about')}</Link>
                              <Link to="/">{this.translate('page.body.landing.footer.community')}</Link>
                              <Link to="/">{this.translate('page.body.landing.footer.info')}</Link>
                           </div>
                     </div>
                     <div className="pg-landing-screen__footer__wrap__social">
                           <div className="pg-landing-screen__footer__wrap__social__row">
                              <img src={TelegramIcon} alt="Telegram" />
                              <img src={LinkedInIcon} alt="LinkedIn" />
                              <img src={TwitterIcon} alt="Twitter" />
                              <img src={YouTubeIcon} alt="YouTube" />
                           </div>
                           <div className="pg-landing-screen__footer__wrap__social__row">
                              <img src={RedditIcon} alt="Reddit" />
                              <img src={FacebookIcon} alt="Facebook" />
                              <img src={MediumIcon} alt="MediumIcon" />
                              <img src={CoinMarketIcon} alt="CoinMarket" />
                           </div>
                     </div>
                  </div>
                  <span className="pg-landing-screen__footer__rights">{this.translate('page.body.landing.footer.rights')}</span>
               </div> */}
         </>
      );
   }

   public renderPopular() {
      const sliderOptions = {
         speed: 500,
         slidesToShow: 3,
         slidesToScroll: 1,
         accessibility: true,
         responsive: [
            {
              breakpoint: 980,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
      }
      return (
         <div className="section-bg section-mb0 popular">
            <div className="popular__center center">
               <div className="popular__head">
                  <h2 className="popular__title h2">Become a crypto trader in seconds</h2>
                  <div className="popular__info">We've got everything you need to start trading.</div>
               </div>
               <div className="popular__wrapper">
                  <Slider {...sliderOptions} className="popular__slider js-slider-popular">
                     <div className="popular__item">
                        <div className="popular__preview">
                           <img srcSet={`${ilusCard12} 2x`} src={ilusCard11} alt="Card" />
                        </div>
                        <div className="popular__subtitle">Buy & Sell Crypto</div>
                        <div className="popular__content">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <a className="button-stroke button-small popular__button" href="buy-crypto.html">Buy crypto</a>
                     </div>
                     <div className="popular__item">
                        <div className="popular__preview">
                           <img srcSet={`${ilusCard22} 2x`} src={ilusCard21} alt="Card" />
                        </div>
                        <div className="popular__subtitle">Trade Assets</div>
                        <div className="popular__content">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <a className="button-stroke button-small popular__button" href="exchange.html">Trade now</a>
                     </div>
                     <div className="popular__item">
                        <div className="popular__preview">
                           <img srcSet={`${ilusCard32} 2x`} src={ilusCard31} alt="Card" />
                        </div>
                        <div className="popular__subtitle">Learn crypto</div>
                        <div className="popular__content">We realize ideas from simple to complex, everything becomes easy to use and reach the most potential customers.</div>
                        <a className="button-stroke button-small popular__button" href="learn-crypto.html">Learn now</a>
                     </div>
                  </Slider>
               </div>
               <div className="popular__btns">
                  <a className="button popular__button" href="contact.html">Contact Us</a>
               </div>
            </div>
         </div>
      )
   }

   public renderNews() {
      const sliderOptions = {
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         accessibility: true,
      }
      return (
         <div className="section-bg news">
            <div className="news__center center">
               <div className="news__head">
                  <div className="news__logo">
                     <img className="some-icon" style={{ display: 'unset' }} src={icLogoLight} alt="Digiasset" />
                     <img className="some-icon-dark" src={icLogoDark} alt="Digiasset" />
                  </div>
                  <h2 className="news__title h2">Stay in the know on crypto with Digiasset</h2>
                  <div className="news__info">A creative agency that lead and inspire</div>
               </div>
               <div className="news__wrapper">
                  <Slider { ...sliderOptions } className="news__slider js-slider-news">
                     <div className="news__item">
                        <div className="news__preview">
                           <img srcSet={`${ilusNews12}`} src={ilusNews11} alt="Card" />
                        </div>
                        <div className="news__wrap">
                           <div className="stage-small news__stage">crypto news</div>
                           <div className="news__subtitle">Be Part of our Global Community</div>
                           <div className="news__content">Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.</div>
                           <a className="button-stroke button-small news__button" href="learn-crypto-details.html">Join now</a>
                        </div>
                     </div>
                     <div className="news__item">
                        <div className="news__preview">
                           <img srcSet={`${ilusNews12}`} src={ilusNews11} alt="Card" />
                        </div>
                        <div className="news__wrap">
                           <div className="stage-small news__stage">crypto news</div>
                           <div className="news__subtitle">Be Part of our Global Community</div>
                           <div className="news__content">Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.</div>
                           <a className="button-stroke button-small news__button" href="learn-crypto-details.html">Join now</a>
                        </div>
                     </div>
                     <div className="news__item">
                        <div className="news__preview">
                           <img srcSet={`${ilusNews12}`} src={ilusNews11} alt="Card" />
                        </div>
                        <div className="news__wrap">
                           <div className="stage-small news__stage">crypto news</div>
                           <div className="news__subtitle">Be Part of our Global Community</div>
                           <div className="news__content">Let’s stay in touch. Join our communities to keep up with the Digiasset team and our traders from across the world.</div>
                           <a className="button-stroke button-small news__button" href="learn-crypto-details.html">Join now</a>
                        </div>
                     </div>
                  </Slider>
               </div>
            </div>
         </div>
      )
   }

   public renderMain() {
      return (
         <div className="outer__inner">
            <Hero />
            <Learn />
            {/* <Trend /> */}
            <MyMarketsTable />
            {this.renderPopular()}
            <Download />
            {this.renderNews()}
            <Step />
         </div>
      )
   }

   public render() {
      return (
         <>
            {/* <div className="pg-landing-screen"> */}
            {this.renderHeader()}
            {this.renderMain()}
            {/* {this.renderMarketInfoBlock()}
                {this.renderPlatformInfoBlock()}
                {this.renderRegisterBlock()}
                {this.renderFeaturesBlock()}
                {this.renderTradeOnTheGoBlock()}
                {this.renderStartTradingBlock()} */}
            {this.renderFooter()}
         </>
      );
   }

   // private handleScrollTop = () => {
   //    window.scrollTo({ top: 0, behavior: 'smooth' });
   // };

   private translate = (key: string) => this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   isLoggedIn: selectUserLoggedIn(state),
   colorTheme: selectCurrentColorTheme(state),
});

export const LandingScreen = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, null),
)(Landing) as React.ComponentClass;
