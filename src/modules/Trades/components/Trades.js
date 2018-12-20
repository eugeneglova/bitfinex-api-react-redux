import React from "react";
import _ from "lodash";

const Trades = ({ trades }) => {
  if (!Object.keys(trades).length) return <div />;

  const format5 = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 5
  }).format;

  const format4 = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format;

  const sortedTrades = _.orderBy(trades, ["mts"], ["desc"]).slice(0, 25);

  return (
    <div className="trades">
      <table width="100%">
        <thead>
          <tr>
            <th className="col" />
            <th className="col">Time</th>
            <th className="col">Price</th>
            <th className="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {_.map(sortedTrades, ({ id, mts, amount, price }) => {
            const percentage = (Math.abs(amount) / price) * 50000;
            return (
              <tr
                key={id}
                style={{
                  background:
                    amount < 0
                      ? `rgba(225, 86, 86, ${percentage}%)`
                      : `rgba(157, 194, 74, ${percentage}%)`
                }}
              >
                <td className="col-info">{amount >= 0 ? "up" : "down"}</td>
                <td className="col-info">
                  <span>{new Date(mts).toLocaleTimeString()}</span>
                </td>
                <td className="col-info">
                  <span className=" ">{format5(price)}</span>
                </td>
                <td className="col-currency" style={{ paddingRight: "10px" }}>
                  {format4(Math.abs(amount))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
