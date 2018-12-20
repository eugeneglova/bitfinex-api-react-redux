import React from "react";

const Book = ({ snapshot }) => {
  const bids = snapshot
    .filter(a => a[2] > 0)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 25);
  const asks = snapshot
    .filter(a => a[2] < 0)
    .sort((a, b) => a[0] - b[0])
    .slice(0, 25);
  return (
    <div className="main">
      <div className="bids">
        <div className="header">
          <div className="cell">Count</div>
          <div className="cell">Amount</div>
          <div className="cell">Total</div>
          <div className="cell">Price</div>
        </div>
        {bids.map(item => (
          <div className="row" key={item[0]}>
            <div className="cell">{item[1]}</div>
            <div className="cell">{item[2]}</div>
            <div className="cell">{item[3]}</div>
            <div className="cell">{item[0]}</div>
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
        {asks.map(item => (
          <div className="row" key={item[0]}>
            <div className="cell">{item[0]}</div>
            <div className="cell">{item[3]}</div>
            <div className="cell">{-item[2]}</div>
            <div className="cell">{item[1]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;
