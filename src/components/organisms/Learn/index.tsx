import React, { FC } from 'react';
import { Tab } from '@headlessui/react';
import { MyTab } from '../../../components';
import {
   ilusLearn11,
   ilusLearn12,
   ilusLearn21,
   ilusLearn22,
   ilusLearn31,
   ilusLearn32,
   ilusLearn41,
   ilusLearn42
} from '../../../assets';

export const Learn: FC = () => {
   return (
      <div className="section learn">
         <div className="learn__anchor anchor" id="learn"></div>
         <div className="learn__center center">
            <div className="learn__head">
               <div className="learn__wrap">
                  <h2 className="learn__title h2">Learn crypto</h2>
               </div>
               <a className="button-stroke learn__button" href="learn-crypto.html">View more</a>
            </div>
            <MyTab titles={['All', 'Bitcoin', 'Blockchain', 'Tutorial']}>
               <>
                  <Tab.Panel>
                     <div className="learn__wrapper">
                        <div className="learn__slider js-slider-learn js-slider-resize">
                           <a className="learn__item" href="learn-crypto-details.html">
                              <div className="learn__preview">
                                 <img srcSet={`${ilusLearn12} 2x`} src={ilusLearn11} alt="Card" />
                              </div>
                              <div className="learn__line">
                                 <div className="learn__wrap">
                                    <div className="learn__subtitle">Leveraged tokens now available</div>
                                    <div className="learn__content">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 </div>
                                 <button className="button-stroke learn__button">
                                    <span>Learn more</span>
                                    <svg className="icon icon-arrow-right">
                                       <use xlinkHref="#icon-arrow-right"></use>
                                    </svg>
                                 </button>
                              </div>
                           </a>
                           <a className="learn__item" href="learn-crypto-details.html">
                              <div className="learn__preview">
                                 <img srcSet={`${ilusLearn22} 2x`} src={ilusLearn21} alt="Card" />
                              </div>
                              <div className="learn__details">
                                 <div className="learn__subtitle">Leveraged tokens now available</div>
                                 <div className="learn__content">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="learn__date">Jun 1, 2021</div>
                              </div>
                           </a>
                           <a className="learn__item" href="learn-crypto-details.html">
                              <div className="learn__preview">
                                 <img srcSet={`${ilusLearn32} 2x`} src={ilusLearn31} alt="Card" />
                                 <button className="play play_small">
                                    <svg className="icon icon-play">
                                       <use xlinkHref="#icon-play"></use>
                                    </svg>
                                 </button>
                              </div>
                              <div className="learn__details">
                                 <div className="learn__subtitle">Leveraged tokens now available</div>
                                 <div className="learn__content">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="learn__date">Jun 1, 2021</div>
                              </div>
                           </a>
                           <a className="learn__item" href="learn-crypto-details.html">
                              <div className="learn__preview">
                                 <img srcSet={`${ilusLearn42} 2x`} src={ilusLearn41} alt="Card" />
                              </div>
                              <div className="learn__details">
                                 <div className="learn__subtitle">Leveraged tokens now available</div>
                                 <div className="learn__content">Good things come in 3s. Get 3x Leveraged tokens now.</div>
                                 <div className="learn__date">Jun 1, 2021</div>
                              </div>
                           </a>
                        </div>
                     </div>
                  </Tab.Panel>
                  <Tab.Panel>
                     Bitcoin
                  </Tab.Panel>
                  <Tab.Panel>
                     Blockchain
                  </Tab.Panel>
                  <Tab.Panel>
                     Tutorial
                  </Tab.Panel>
               </>
            </MyTab>
         </div>
      </div>
   );
};
