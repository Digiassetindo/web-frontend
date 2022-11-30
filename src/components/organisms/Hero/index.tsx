import React, { FC } from 'react';
import { icBitcoin, icChainlink, icMaid, icMonero, ilusCard, ilusCard2 } from '../../../assets';

export const Hero: FC = () => {
   return (
      <div className="section main">
         <div className="main__center center">
            <div className="main__wrap">
               <h1 className="main__title h1">Buy & sell <br />crypto in minutes </h1>
               <div className="main__text">Trade Bitcoin, Ethereum, USDT, and the top altcoins on the legendary crypto asset exchange.</div>
               <a className="button main__button" href="sign-up.html">Get started now</a>
               <a className="main__scroll scroll js-scroll" href="#learn">
                  <div className="scroll__line">
                     <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clipRule="evenodd"
                           d="M16.7348 14.0909C17.1094 14.4968 17.0841 15.1294 16.6783 15.504L13.1783 18.7348C12.7953 19.0884 12.2048 19.0884 11.8218 18.7348L8.32172 15.504C7.91589 15.1294 7.89058 14.4968 8.26519 14.091C8.63979 13.6851 9.27245 13.6598 9.67827 14.0344L11.5 15.716L11.5 6C11.5 5.44771 11.9477 5 12.5 5C13.0523 5 13.5 5.44771 13.5 6L13.5 15.716L15.3217 14.0344C15.7275 13.6598 16.3602 13.6851 16.7348 14.0909Z"
                           fill="#B1B5C4" />
                     </svg>
                     <svg className="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M16.7348 14.0909C17.1094 14.4968 17.0841 15.1294 16.6783 15.504L13.1783 18.7348C12.7953 19.0884 12.2048 19.0884 11.8218 18.7348L8.32172 15.504C7.91589 15.1294 7.89058 14.4968 8.26519 14.091C8.63979 13.6851 9.27245 13.6598 9.67827 14.0344L11.5 15.716L11.5 6C11.5 5.44771 11.9477 5 12.5 5C13.0523 5 13.5 5.44771 13.5 6L13.5 15.716L15.3217 14.0344C15.7275 13.6598 16.3602 13.6851 16.7348 14.0909Z"
                           fill="#B1B5C4" />
                     </svg>
                  </div>
               </a>
            </div>
            <div className="main__bg">
               <img srcSet={`${ilusCard2} 2x`} src={ilusCard} alt="Cards" />
            </div>
            <div className="main__cards">
               <a className="main__card" href="exchange.html">
                  <div className="main__icon">
                     <img src={icBitcoin} alt="Bitcoin" />
                  </div>
                  <div className="main__details">
                     <div className="main__line">
                        <div className="main__subtitle">BTC/USDT</div>
                        <div className="main__negative">-0.79% </div>
                     </div>
                     <div className="main__price">36,641.20</div>
                     <div className="main__money">36,641.20</div>
                  </div>
               </a>
               <a className="main__card" href="exchange.html">
                  <div className="main__icon">
                     <img src={icChainlink} alt="Chainlink" />
                  </div>
                  <div className="main__details">
                     <div className="main__line">
                        <div className="main__subtitle">BTC/USDT</div>
                        <div className="main__positive">+0.79%</div>
                     </div>
                     <div className="main__price">36,641.20</div>
                     <div className="main__money">36,641.20</div>
                  </div>
               </a>
               <a className="main__card" href="exchange.html">
                  <div className="main__icon">
                     <img src={icMonero} alt="Monero" />
                  </div>
                  <div className="main__details">
                     <div className="main__line">
                        <div className="main__subtitle">BTC/USDT</div>
                        <div className="main__positive">+0.79%</div>
                     </div>
                     <div className="main__price">36,641.20</div>
                     <div className="main__money">36,641.20</div>
                  </div>
               </a>
               <a className="main__card" href="exchange.html">
                  <div className="main__icon">
                     <img src={icMaid} alt="Maid" />
                  </div>
                  <div className="main__details">
                     <div className="main__line">
                        <div className="main__subtitle">BTC/USDT</div>
                        <div className="main__positive">+0.79%</div>
                     </div>
                     <div className="main__price">36,641.20</div>
                     <div className="main__money">36,641.20</div>
                  </div>
               </a>
            </div>
         </div>
      </div>
   );
};
