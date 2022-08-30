import React, { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Market } from 'modules';
import { Decimal } from 'components';
import {
   icBitcoin, icDash, icEthereum, icRipple,
   // icBitcoinCash,
   // icChainlink,
   // icEthereum,
   // icRipple
} from 'assets';
import ReactPaginate from 'react-paginate';
// import ReactTable from 'react-table';
import { AreaChart, Area } from 'recharts';

interface Props {
   currentBidUnit: string;
   currentBidUnitsList: string[];
   markets: Market[];
   redirectToTrading: (key: string) => void;
   setCurrentBidUnit: (key: string) => void;
}

// const charts = [
//    {
//      name: "Page A",
//      uv: 4000,
//      pv: 2400,
//      amt: 2400
//    },
//    {
//      name: "Page F",
//      uv: 2390,
//      pv: 3800,
//      amt: 2500
//    },
//    {
//      name: "Page G",
//      uv: 3490,
//      pv: 4300,
//      amt: 2100
//    }
//  ];

export const MyTickerTable: FC<Props> = ({
   currentBidUnit,
   markets,
   setCurrentBidUnit,
   currentBidUnitsList,
   redirectToTrading,
}) => {
   // console.log(markets);

   const { formatMessage } = useIntl();
   const renderItem = useCallback(
      (market, index: number) => {
         const marketChangeColor = +(market.change || 0) < 0 ? 'trend__negative' : 'trend__positive';
         const marketChangeIcon = market.name.split('/').shift();
         let cobas = `${parseInt(market.last)}:${parseInt(market.open)}`;
         let w = cobas.split(':');
         // console.log(w);

         return (
            <a className="trend__row" key={index}>
               <div className="trend__col">{index + 1}</div>
               <div className="trend__col">
                  <div className="trend__item">
                     <div className="trend__icon">
                        <img src={
                           marketChangeIcon === 'DASH'
                              ? icDash : marketChangeIcon === 'ETH'
                              ? icEthereum : marketChangeIcon === 'BTC'
                              ? icBitcoin : icRipple
                        } alt={market && market.name.split('/').shift()} />
                     </div>
                     <div className="trend__details">
                        <span className="trend__subtitle">{market && market.name.split('/').shift()}</span>
                        <span className="trend__currency">{market && market.name.split('/').pop()}</span>
                     </div>
                  </div>
               </div>
               <div className="trend__col">
                  <Decimal fixed={market?.amount_precision} thousSep=",">
                     {market?.last}
                  </Decimal>
               </div>
               <div className="trend__col">
                  <div className={marketChangeColor}>{market.price_change_percent}</div>
               </div>
               <div className="trend__col">
                  <Decimal fixed={market.amount_precision} thousSep=",">
                     {market.high}
                  </Decimal>
               </div>
               <div className="trend__col">
                  <Decimal fixed={market.amount_precision} thousSep=",">
                     {market.low}
                  </Decimal>
               </div>
               <div className="trend__col">
                  <Decimal fixed={market.amount_precision} thousSep=",">
                     {market.volume}
                  </Decimal>
               </div>
               <div className="trend__col">
                  <div className="trend__chart">
                     {/* <div className="js-chart-positive"></div> */}
                     <AreaChart
                        width={136}
                        height={50}
                        data={w}
                        margin={{
                          top: 5,
                          right: 0,
                          left: 0,
                          bottom: 5
                        }}
                     >
                        <Area type="monotone" dataKey="uv" stroke="#58BD7D" fill="#58BD7D" />
                     </AreaChart>
                  </div>
               </div>
               <div className="trend__col">
                  <button
                     className="button-stroke button-small trend__button"
                     onClick={() => redirectToTrading(market.id)}
                  >
                     Trade
                  </button>
               </div>
            </a>
         );
      },
      [redirectToTrading]
   );

   return (
      <>
         <div className="section trend">
            <div className="trend__center center">
               <div className="trend__line">
                  <h2 className="trend__title h2">Market trend</h2>
                  <a className="button-stroke trend__button" href="market.html">View more</a>
               </div>
               <div className="nav">
                  {currentBidUnitsList.map((item, index) => (
                     <button
                        key={index}
                        className={`nav__link ${item === currentBidUnit ? 'active' : ''}`}
                        onClick={() => setCurrentBidUnit(item)}
                     >
                        {item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                     </button>
                  ))}
               </div>
               <select className="select" style={{ display: 'none' }}>
                  <option>All</option>
                  <option>DeFi</option>
                  <option>Innovation</option>
                  <option>POS</option>
                  <option>NFT</option>
                  <option>POW</option>
                  <option>Storage </option>
               </select>
               <div className="trend__table table-auto">
                  <div className="trend__row">
                     <div className="trend__col">#</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.pair' })}</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.high' })}</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.low' })}</div>
                     <div className="trend__col">{formatMessage({ id: 'page.body.marketsTable.header.volume' })}</div>
                     <div className="trend__col">Chart</div>
                     <div className="trend__col">Trade</div>
                  </div>
                  {
                     markets[0] ? (
                        markets.map(renderItem)
                     ) : (
                        <a className="trend__row">
                           <div className="trend__col">
                              <div style={{ width: '100%', textAlign: 'center' }}>{formatMessage({ id: 'page.noDataToShow' })}</div>
                           </div>
                        </a>
                     )
                  }
               </div>
               <ReactPaginate
                  pageCount={Math.min(10, 5)}
                  className="flex justify-end space-x-3 mt-5"
                  previousLabel="<="
                  nextLabel="=>"
                  activeLinkClassName="p-active"
                  pageLinkClassName="p-initial"
                  breakLinkClassName="p-initial"
                  nextLinkClassName="p-initial"
                  previousLinkClassName="p-initial"
                  disabledLinkClassName="p-disabled"
               />
            </div>
         </div>
      </>
   );
};
