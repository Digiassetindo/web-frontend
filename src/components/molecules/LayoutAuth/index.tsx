import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { icLogoDark, icLogoLight, ilusLogin } from 'assets';

interface AuthProps {
   txtHeader?: string | boolean | undefined;
   to?: string;
   toTxt?: string;
   onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
   children: JSX.Element | any;
}

export const LayoutAuth: FC<AuthProps> = ({ txtHeader, to, toTxt, children, onKeyPress }) => {
   return (
      <div className="flex flex-col flex-grow">
         <div className="block lg:flex">
            <div
               className="relative flex-shrink-0 w-auto sm:w-[350px] lg:w-[420px] xl:w-[512px] min-h-auto lg:min-h-screen bg-none lg:bg-[#23262F] bg-no-repeat bg-cover"
               style={{
                  backgroundImage: `url(${ilusLogin})`,
                  backgroundPosition: '100% 50%'
               }}
            >
               <Link to="/" className="login__logo">
                  <img src={icLogoLight} title="Digiasset" alt="Digiasset" />
                  <img src={icLogoDark} title="Digiasset" alt="Digiasset" />
               </Link>
            </div>
            <div className="relative flex flex-shrink-0 flex-grow md:px-12 md:pt-[124px] md:pb-[76px] xl:px-16 xl:pt-[148px] xl:pb-[132px]">
               <div className="absolute right-12 inset-x-16 top-14 xl:inset-x-20 xl:top-20 font-dm text-sm font-bold leading-[1.14286] text-right">
                  {txtHeader}
                  <Link
                     to={to ?? ''}
                     className="ml-[5px] text-[#3772FF] hover:text-[#044eff] transition-colors duration-300 items-baseline"
                  >
                     &nbsp; {toTxt}
                  </Link>
               </div>
               <div className="m-auto w-[380px]">
                  {children}
                  {/* <div>
                     <div className="pb-8 mb-8 border-b border-solid border-[#E6E8EC]">
                        <div className="mb-8 text-center text-[40px] leading-[1.2] tracking-[-.01em] font-dm font-bold text-[#23262f]">
                           {title}
                        </div>
                        {
                           subTitle && (
                              <div className="text-center text-xs leading-[1.66667] text-[#777E90]">
                                 {subTitle}
                              </div>
                           )
                        }
                     </div>
                     <div onKeyPress={onKeyPress}>
                        {children}
                     </div>
                  </div> */}
               </div>
            </div>
         </div>
      </div>
   );
};
