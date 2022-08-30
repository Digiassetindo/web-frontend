import React, { FC } from 'react';
import {
   ilusStep11,
   ilusStep12,
   ilusStep21,
   ilusStep22,
   ilusStep31,
   ilusStep32,
   ilusStep41,
   ilusStep42
} from '../../../assets';

export const Step: FC = () => {
   return (
      <div className="section steps">
         <div className="steps__center center">
            <div className="steps__head">
               <h2 className="steps__title h2">How it works</h2>
               <div className="steps__info">Stacks is a production-ready library of stackable content blocks built in React Native.</div>
            </div>
            <div className="steps__list">
               <div className="steps__item">
                  <div className="steps__preview">
                     <img srcSet={`${ilusStep12} 2x`} src={ilusStep11} alt="Step 1" />
                  </div>
                  <div className="steps__number">Step 1</div>
                  <div className="steps__subtitle">Download</div>
                  <div className="steps__content">Stacks is a production-ready library of stackable content blocks built in React Native.</div>
               </div>
               <div className="steps__item">
                  <div className="steps__preview">
                     <img srcSet={`${ilusStep22} 2x`} src={ilusStep21} alt="Step 1" />
                  </div>
                  <div className="steps__number">Step 2</div>
                  <div className="steps__subtitle">Connect wallet</div>
                  <div className="steps__content">Stacks is a production-ready library of stackable content blocks built in React Native.</div>
               </div>
               <div className="steps__item">
                  <div className="steps__preview">
                     <img srcSet={`${ilusStep32} 2x`} src={ilusStep31} alt="Step 3" />
                  </div>
                  <div className="steps__number">Step 3</div>
                  <div className="steps__subtitle">Start trading</div>
                  <div className="steps__content">Stacks is a production-ready library of stackable content blocks built in React Native.</div>
               </div>
               <div className="steps__item">
                  <div className="steps__preview">
                     <img srcSet={`${ilusStep42} 2x`} src={ilusStep41} alt="Step 4" />
                  </div>
                  <div className="steps__number">Step 4</div>
                  <div className="steps__subtitle">Earn money</div>
                  <div className="steps__content">Stacks is a production-ready library of stackable content blocks built in React Native.</div>
               </div>
            </div>
         </div>
      </div>
   );
};
