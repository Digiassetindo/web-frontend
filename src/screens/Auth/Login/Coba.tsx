export const Coba = () => {
   return <h1>WKwkwk</h1>
}

// import React, { FC, useEffect } from 'react';
// import { icLogoDark, icLogoLight, ilusLogin } from 'assets';
// import { Input } from 'components';
// import { useForm } from 'hooks';

// export const Coba: FC = () => {
//    const [{ email, password }, setValue, newValue] = useForm({ email: '', password: '' });

//    useEffect(() => {
//       handleResetForm();
//    }, []);

//    const handleResetForm = () => newValue({ email: '', password: '' });

//    const handleLogin = (e: any) => {
//       e.preventDefault();
//       console.table([email, password]);
//    }

//    return (
//       <div className="flex flex-col flex-grow">
//          <div className="block lg:flex">
//             <div className="relative flex-shrink-0 w-[420px] xl:w-[512px] min-h-screen bg-[#23262F] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${ilusLogin})`, backgroundPosition: '100% 50%' }}>
//                <a className="login__logo" href="index.html">
//                   <img src={icLogoLight} alt="Digiasset" />
//                   <img src={icLogoDark} alt="Digiasset" />
//                </a>
//             </div>
            // <div className="login__col">
            //    <div className="login__head">Don’t have an account? <a className="login__link" href="sign-up.html">Sign up for free</a>
            //    </div>
            //    <div className="login__wrap">
            //       <div className="entry">
            //          <div className="mb-8">
            //             <h3 className="entry__title h3">Login to Digiasset</h3>
            //          </div>
            //          <form onSubmit={handleLogin} className="entry__form">
            //             <div className="entry__tabs js-tabs">
            //                <div className="entry__container">
            //                   <div className="entry__item js-tabs-item" style={{ display: 'block' }}>
            //                      <Input
            //                         label="email"
            //                         type="email"
            //                         name="email"
            //                         id="email"
            //                         placeholder="Email Address"
            //                         value={email}
            //                         onChange={setValue}
            //                      />
            //                   </div>
            //                   {/* <div className="entry__item js-tabs-item">
            //                      <div className="entry__line">
            //                         <div className="field">
            //                            <div className="field__label">mobile</div>
            //                            <div className="field__wrap">
            //                               <select className="select">
            //                                  <option>🇺🇸 +1</option>
            //                                  <option>🇻🇳 +3</option>
            //                                  <option>🇷🇺 +7</option>
            //                               </select>
            //                            </div>
            //                         </div>
            //                         <div className="field">
            //                            <div className="field__label">phone</div>
            //                            <div className="field__wrap">
            //                               <input className="field__input" type="tel" name="phone" required />
            //                            </div>
            //                         </div>
            //                      </div>
            //                   </div> */}
            //                </div>
            //                <Input
            //                   label="password"
            //                   type="password"
            //                   name="password"
            //                   id="password"
            //                   placeholder="Password"
            //                   value={password}
            //                   onChange={setValue}
            //                />
            //                <div className="entry__foot">
            //                   <button className="entry__scan" type="button">Scan to login</button>
            //                   <a className="entry__link" href="forgot-password.html">Forgot password?</a>
            //                </div>
            //                <button type="button" className="button entry__button">Reset</button>
            //                <button type="submit" className="button entry__button">Login yuk</button>
            //             </div>
            //          </form>
            //          <div className="entry__wrap">
            //             <div className="entry__box">
            //                <div className="entry__details">
            //                   <div className="entry__code">
            //                      <img src="img/content/qr-code.jpg" alt="Qr code" />
            //                   </div>
            //                   <button className="button-stroke entry__button">Download app</button>
            //                </div>
            //             </div>
            //          </div>
            //       </div>
            //    </div>
            // </div>
//          </div>
//       </div>
//    );
// };
