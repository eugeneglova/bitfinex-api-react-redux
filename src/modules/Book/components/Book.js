import React from "react";

const Book = ({ snapshot, channel, decreasePrecision, increasePrecision }) => {
  const bids = snapshot
    .filter(a => a[2] > 0)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 25);
  const asks = snapshot
    .filter(a => a[2] < 0)
    .sort((a, b) => a[0] - b[0])
    .slice(0, 25);
  const format5 = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 5
  }).format;
  const format3 = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3
  }).format;

  const maxBid = bids.reduce((acc, item) => {
    const total = item[1] * item[2];
    return acc > total ? acc : total;
  }, 0);
  const maxAsk = asks.reduce((acc, item) => {
    const total = item[1] * -item[2];
    return acc > total ? acc : total;
  }, 0);

  return (
    <div>
      <div>
        <button
          title="Decrease Precision"
          onClick={() => decreasePrecision(channel.channel)}
          disabled={channel.prec === "P4"}
        >
          -
        </button>
        <button
          title="Increase Precision"
          onClick={() => increasePrecision(channel.channel)}
          disabled={channel.prec === "P0"}
        >
          +
        </button>
      </div>
      <div className="main">
        <div className="bids">
          <div className="header">
            <div className="cell">Count</div>
            <div className="cell">Amount</div>
            <div className="cell">Total</div>
            <div className="cell">Price</div>
          </div>
          <div className="bars">
            <svg
              style={{
                width: "100%",
                height: "408px",
                transform: "scale(-1, 1)",
                zIndex: 0,
                pointerEvents: "none"
              }}
            >
              {bids.map((item, index) => (
                <rect
                  key={index}
                  x="1"
                  y={17 * index}
                  width={`${((item[1] * item[2]) / maxBid) * 100}%`}
                  height="17"
                  fill="#89bc3e"
                  fillOpacity="0.2"
                />
              ))}
            </svg>
          </div>
          {bids.map(item => (
            <div className="row" key={item[0]}>
              <div className="cell">{item[1]}</div>
              <div className="cell">{format3(item[2])}</div>
              <div className="cell">{format3(item[1] * item[2])}</div>
              <div className="cell">{format5(item[0])}</div>
            </div>
          ))}
        </div>
        <div className="asks">
          <div className="header">
            <div className="cell">Price</div>
            <div className="cell">Total</div>
            <div className="cell">Amount</div>
            <div className="cell">Count</div>
          </div>
          <div className="bars">
            <svg
              style={{
                width: "100%",
                height: "408px",
                transform: "scale(1, 1)",
                zIndex: 0,
                pointerEvents: "none"
              }}
            >
              {asks.map((item, index) => (
                <rect
                  key={index}
                  x="1"
                  y={17 * index}
                  width={`${((item[1] * -item[2]) / maxAsk) * 100}%`}
                  height="17"
                  fill="#d8464e"
                  fillOpacity="0.2"
                />
              ))}
            </svg>
          </div>
          {asks.map(item => (
            <div className="row" key={item[0]}>
              <div className="cell">{format5(item[0])}</div>
              <div className="cell">{format3(item[1] * -item[2])}</div>
              <div className="cell">{format3(-item[2])}</div>
              <div className="cell">{item[1]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Book;
