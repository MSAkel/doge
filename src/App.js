import React from "react";
import Table from "./table";

import "./App.css";
import Card from "./card";

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Data",
        columns: [
          {
            Header: "Coins bought",
            accessor: "coins",
          },
          {
            Header: "Amount Paid",
            accessor: "total",
          },
          {
            Header: "Coin Price",
            accessor: "coinPrice",
          },
          {
            Header: "Fees",
            accessor: "fee",
          },
          {
            Header: "Received",
            accessor: "received",
          },
          {
            Header: "For Hamoodi",
            accessor: "forHamoodi",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState();
  const [coinPrice, setCoinPrice] = React.useState();
  const [forHamoodi, setForHamoodi] = React.useState(false);

  const [balance, setBalance] = React.useState(0);
  const [spent, setSpent] = React.useState(0);
  const [bought, setBought] = React.useState(0);
  const [avg, setAvg] = React.useState(0);
  const [totalFees, setTotalFees] = React.useState(0);
  const [received, setReceived] = React.useState(0);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const coins = (+total / +coinPrice).toFixed(0);
    const fee = ((+coins / 100) * 0.2).toFixed(3);
    const received = (+coins - +fee).toFixed(3);
    console.log(forHamoodi);
    const inputValue = {
      coins,
      total,
      coinPrice,
      fee,
      received,
      forHamoodi: forHamoodi ? "Yes" : "No",
    };

    const allRecords = [];
    if (data) {
      allRecords.push(...data, inputValue);
      setData((prev) => [...prev, inputValue]);
    } else {
      allRecords.push(inputValue);
      setData(inputValue);
    }

    localStorage.setItem("data", JSON.stringify(allRecords));
    updateCards();
  };

  const submitBalance = (ev) => {
    // ev.preventDefault();
    setBalance(ev.target.value);
    localStorage.setItem("balance", JSON.stringify(balance));
  };

  const updateCards = () => {
    let _data = JSON.parse(localStorage.getItem("data"));
    let _spent = 0;
    let _bought = 0;
    let _avg = 0;
    let _totalFees = 0;
    let _received = 0;
    _data.forEach((el) => {
      _spent += parseFloat(el.total);
      _bought += parseFloat(el.coins);
      _avg += parseFloat(el.coinPrice);
      _totalFees += parseFloat(el.fee);
      _received += parseFloat(el.received);
    });
    _avg = _avg / _data.length;
    setBalance(0);
    setSpent(_spent.toFixed(3));
    setBought(_bought.toFixed(3));
    setAvg(_avg.toFixed(5));
    setTotalFees(_totalFees.toFixed(3));
    setReceived(_received.toFixed(3));
  };

  React.useEffect(() => {
    if (localStorage.getItem("data")) {
      setData(JSON.parse(localStorage.getItem("data")));
      updateCards();
    }
    if (localStorage.getItem("balance")) {
      setBalance(JSON.parse(localStorage.getItem("balance")));
    }
  }, []);

  return (
    <div className="App">
      <div className="content-container">
        <div className="cards-container">
          <div className="card-container">
            <div className="card-content">
              <h2>Total In Bank</h2>
              <input
                className="blnc"
                type="text"
                name="balance"
                value={balance}
                onChange={(ev) => submitBalance(ev)}
              />
            </div>
          </div>
          <Card name="Total paid NDAX" number={spent} />
          <Card name="Total Coins" number={bought} />
          <Card name="Total Fees (coins)" number={totalFees} />
          <Card name="Total Coins Received" number={received} />
          <Card name="Average Cost" number={avg} />
        </div>

        <div className="row-container">
          <form onSubmit={(ev) => handleSubmit(ev)} className="form-container">
            <h1>Add Record</h1>
            <div className="field-container">
              <h4>$ Total paid:</h4>
              <input
                type="text"
                name="total"
                value={total}
                onChange={(ev) => setTotal(ev.target.value)}
              />
            </div>

            <div className="field-container">
              <h4>$ Price per coin:</h4>
              <input
                type="text"
                name="coinPrice"
                value={coinPrice}
                onChange={(ev) => setCoinPrice(ev.target.value)}
              />
            </div>

            <div className="field-container">
              <h4>For Hamoodi</h4>
              <input
                type="checkbox"
                name="hamoodi"
                value={forHamoodi}
                onChange={(ev) => setForHamoodi(ev.target.checked)}
              />
            </div>

            <input type="submit" value="Submit" className="submit-btn" />
          </form>

          {data.length && (
            <Table columns={columns} data={data} setData={setData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
