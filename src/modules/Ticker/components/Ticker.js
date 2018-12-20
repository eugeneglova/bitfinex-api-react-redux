import React from "react";

const Trades = ({ ticker }) => {
  const { lastPrice, high, low, dailyChange, dailyChangePerc, volume } = ticker;

  if (!lastPrice) return <div />;

  const format5 = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 5
  }).format;

  const format2 = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format;

  return (
    <table className="ticker-sidebar-selected ticker-sidebar-box">
      <tbody>
        <tr>
          <td className="col-info" rowSpan="3" style={{ width: "44px" }}>
            <span
              className="svg svg-background"
              style={{
                background:
                  'url("https://www.bitfinex.com/assets/BTC-alt-1ca8728fcf2bc179dfe11f9a0126bc303bee888bff8132c5ff96a4873cf9f0fb.svg")',
                width: "40px",
                height: "40px"
              }}
            />
          </td>
          <td className="col-info" rowSpan="1" style={{ width: "136px" }}>
            <h5>
              <span>
                <span className="">
                  <span>BTC</span>
                  <span className="show-soft">/</span>
                  <span>USD</span>
                </span>
              </span>
              <button
                className="ui-button ui-button--size-XS ui-button--clear"
                style={{ padding: "2px" }}
              >
                up/down
              </button>
            </h5>
          </td>
          <td className="col-info" rowSpan="1">
            <h5>
              <span className=" ">{format5(lastPrice)}</span>
            </h5>
          </td>
        </tr>
        <tr>
          <td className="col-info" rowSpan="1" style={{ width: "18px" }}>
            <span className="show-soft">VOL</span>&nbsp;
            <span
              data-tip="true"
              data-for="tooltip51"
              className="ui-tooltip ui-tooltip--underline ui-tooltip--cursor-help"
              currentitem="false"
            >
              <span className=" ">{format5(volume * lastPrice)}</span>
            </span>
            &nbsp;<span className="show-soft">USD</span>
          </td>
          <td className="col-info" rowSpan="1">
            <span className="bfx-green-text">
              <span className=" ">{format2(dailyChange)}</span>
              (<span className=" ">{format2(dailyChangePerc)}</span>%)
            </span>
          </td>
        </tr>
        <tr>
          <td className="col-info" rowSpan="1" style={{ width: "18px" }}>
            <span className="show-soft">LOW</span>&nbsp;
            <span className=" ">{format5(low)}</span>
          </td>
          <td className="col-info" rowSpan="1">
            <span className="show-soft">HIGH</span>&nbsp;
            <span className=" ">{format5(high)}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Trades;
