// import React from 'react';
// import PropTypes from 'prop-types';
// // import { Tab as MyTab } from '@headlessui/react';

// interface TabProps {
//    titles: string[];
//    isActive: boolean;
// }

// export const MyTab = ({ titles, isActive }: TabProps) => {
//    return (
//       <div className="nav">
//          {
//             titles?.map((title, index) => (
//                <button key={index} className={`nav__link ${isActive}`}>{title}</button>
//             ))
//          }
//       </div>
//    )
// }

// MyTab.propTypes = {
//    titles: PropTypes.string.isRequired,
//    isActive: PropTypes.bool.isRequired,
// }

import React from 'react';
import { Tab } from '@headlessui/react';
import PropTypes from 'prop-types';

interface TabProps {
   titles: string[];
   children?: JSX.Element | JSX.Element[];
}

export const MyTab = ({ titles, children }: TabProps) => {
   return (
      <Tab.Group>
         <Tab.List className="nav">
            {
               titles?.map((title, index) => (
                  <Tab key={index} className={({ selected }) => `nav__link ${selected ? 'active' : ''}`}>
                     {title}
                  </Tab>
               ))
            }
         </Tab.List>
         <Tab.Panels>
            {children}
         </Tab.Panels>
      </Tab.Group>
   );
};

MyTab.propTypes = {
   titles: PropTypes.string.isRequired,
}
