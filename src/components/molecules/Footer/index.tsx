import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IcArrowRight, icLogoDark, icLogoLight } from '../../../assets';

export const Footer: FC = () => {
   const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

   return (
      <footer className="footer">
         <div className="footer__body">
            <div className="footer__center center">
               <div className="footer__col">
                  <Link onClick={handleScrollTop} className="footer__logo" to="/">
                     <img className="some-icon" src={icLogoLight} alt="Digiasset" />
                     <img className="some-icon-dark" src={icLogoDark} alt="Digiasset" />
                  </Link>
                  <div className="footer__item">
                     <div className="footer__category">footer nav <svg className="icon icon-arrow-down">
                        <use xlinkHref="#icon-arrow-down"></use>
                     </svg>
                     </div>
                     <div className="footer__menu">
                        <a className="footer__link" href="exchange.html">Exchange</a>
                        <a className="footer__link" href="buy-crypto.html">Buy crypto</a>
                        <a className="footer__link" href="market.html">Market</a>
                        <a className="footer__link" href="learn-crypto.html">Learn crypto</a>
                        <a className="footer__link" href="contact.html">Contact</a>
                     </div>
                  </div>
               </div>
               <div className="footer__col">
                  <div className="footer__category">contact</div>
                  <div className="footer__info">
                     <p>PT Digiasset Indonesia</p>
                     <p>Jl. Kompol R. Soekanto Sambiroto Blok F10 </p>
                     <p>Semarang, 50271</p>
                     <p>Phone (024) 76412782</p>
                  </div>
               </div>
               <div className="footer__col">
                  <div className="footer__category">newsletter</div>
                  <div className="footer__info">Subscribe our newsletter to get more free design course and resource.</div>
                  <form className="subscription">
                     <input className="subscription__input" type="email" name="email" placeholder="Enter your email" required />
                     <button className="subscription__btn">
                        <IcArrowRight className="" />
                     </button>
                  </form>
               </div>
            </div>
         </div>
         <div className="footer__foot">
            <div className="footer__center center">
               <div className="footer__copyright">Copyright © 2022 Digiassetindo.com. All rights reserved</div>
               <div className="footer__socials">
                  <a className="footer__social" href="https://www.facebook.com/digiassetindo/" target="_blank" rel="noopener noreferrer">
                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M10.0001 16.666C13.682 16.666 16.6667 13.6813 16.6667 9.99935C16.6667 6.31745 13.682 3.33268 10.0001 3.33268C6.31818 3.33268 3.33341 6.31745 3.33341 9.99935C3.33341 13.6813 6.31818 16.666 10.0001 16.666ZM10.0001 18.3327C14.6024 18.3327 18.3334 14.6017 18.3334 9.99935C18.3334 5.39697 14.6024 1.66602 10.0001 1.66602C5.39771 1.66602 1.66675 5.39697 1.66675 9.99935C1.66675 14.6017 5.39771 18.3327 10.0001 18.3327Z"
                           fill="#777E91" />
                        <path
                           d="M10.0001 8.33398C10.0001 7.87375 10.3732 7.50065 10.8334 7.50065H11.6667C12.127 7.50065 12.5001 7.12756 12.5001 6.66732C12.5001 6.20708 12.127 5.83398 11.6667 5.83398H10.8334C9.45266 5.83398 8.33341 6.95328 8.33341 8.33398V10.0007H7.50008C7.03985 10.0007 6.66675 10.3737 6.66675 10.834C6.66675 11.2942 7.03984 11.6673 7.50008 11.6673H8.33341V16.6673C8.33341 17.1276 8.7065 17.5007 9.16675 17.5007C9.627 17.5007 10.0001 17.1276 10.0001 16.6673V11.6673H11.6667C12.127 11.6673 12.5001 11.2942 12.5001 10.834C12.5001 10.3737 12.127 10.0007 11.6667 10.0007H10.0001V8.33398Z"
                           fill="#777E91" />
                     </svg>
                  </a>
                  <a className="footer__social" href="https://twitter.com/digiassetindo" target="_blank" rel="noopener noreferrer">
                     <svg className="icon icon-twitter">
                        <use xlinkHref="#icon-twitter"></use>
                     </svg>
                  </a>
                  <a className="footer__social" href="https://www.instagram.com/digiassetindo/" target="_blank" rel="noopener noreferrer">
                     <svg className="icon icon-instagram">
                        <use xlinkHref="#icon-instagram"></use>
                     </svg>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   );
};
