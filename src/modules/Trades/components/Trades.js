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

  const sortedTrades = _.orderBy(trades, ["mts"], ["desc"]);

  return (
    <div className="trades">
      <table width="100%">
        <thead>
          <tr>
            <th className="Trade__col-arrow" />
            <th className="Trade__col-time">Time</th>
            <th className="Trade__col-price">Price</th>
            <th className="Trade__col-amount">Amount</th>
          </tr>
        </thead>
        <tbody>
          {_.map(sortedTrades, ({ id, mts, amount, price }) => {
            const percentage = (Math.abs(amount) / price) * 20000;
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
                <td className="col-info">
                  <i />
                </td>
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
          <tr style={{ background: "rgba(225, 86, 86, 0.2)" }}>
            <td className="col-info">
              <i />
            </td>
            <td className="col-info">
              <span>13:48:18</span>
            </td>
            <td className="col-info">
              <span className=" ">
                <span>
                  4,135.<span className="trailing-zeros">0</span>
                </span>
              </span>
            </td>
            <td className="col-currency" style={{ paddingRight: "10px" }}>
              <span className=" ">
                <span>2.9923</span>
              </span>
            </td>
          </tr>
          <tr style={{ background: "rgba(225, 86, 86, 0.05)" }}>
            <td className="col-info">
              <i />
            </td>
            <td className="col-info">
              <span>13:47:49</span>
            </td>
            <td className="col-info">
              <span>
                <span>
                  4,135.<span className="trailing-zeros">0</span>
                </span>
              </span>
            </td>
            <td className="col-currency" style={{ paddingRight: "10px" }}>
              <span className=" ">
                <span>
                  0.05<span className="trailing-zeros">00</span>
                </span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
