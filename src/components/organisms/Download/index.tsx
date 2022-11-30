import React, { FC } from 'react'
import { icApple, icGp, ilusDownloadApp11, ilusDownloadApp12 } from '../../../assets';

export const Download: FC = () => {
   return (
      <div className="section-mb0 download">
         <div className="download__center center">
            <div className="download__bg">
               <img srcSet={`${ilusDownloadApp12}`} src={ilusDownloadApp11} alt="Download" />
            </div>
            <div className="download__wrap">
               <h2 className="download__title h2">Trade anywhere</h2>
               <div className="download__info">Anytime, anywhere. Trade crypto on your terms.</div>
               <div className="download__list">
                  <a className="download__item" href="#">
                     <div className="download__icon">
                        <img src={icApple} alt="Apple" />
                     </div>
                     <div className="download__details">
                        <div className="download__content">Download from</div>
                        <div className="download__subtitle">Appstore</div>
                     </div>
                  </a>
                  <a
                     className="download__item"
                     href="https://play.google.com/store/apps/details?id=mobile.digiassetindo.com"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <div className="download__icon">
                        <img src={icGp} alt="Google Play" />
                     </div>
                     <div className="download__details">
                        <div className="download__content">Download from</div>
                        <div className="download__subtitle">Google Play</div>
                     </div>
                  </a>
                  <a className="download__item" href="#">
                     <div className="download__icon">
                        <img src={icApple} alt="Apple" />
                     </div>
                     <div className="download__details">
                        <div className="download__content">Download for</div>
                        <div className="download__subtitle">Mac OS</div>
                     </div>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};
