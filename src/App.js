import { useState } from "react";
import InputBox from "./components/Inputbox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";


function App() {

  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr")

  let data = useCurrencyInfo(from);
  let options = Object.keys(data);

  const onConvert = () => {
    setConvertedAmount(amount * data[to]);
  }
  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setTo(from);
    setFrom(to);
  }

  return (

    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{
      backgroundImage: `url('https://images.pexels.com/photos/1634278/pexels-photo-1634278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
    }}>

      <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label={"From"}
              amount={amount}
              selectCurrency={from}
              Currencyoptions={options}
              onCurrencyChange={(currency) => { setFrom(currency) }}
              onAmountChange={(amount) => setAmount(amount)}

            />
          </div>

          <div className="relative w-full h-0.5">
            <button onClick={swap} type="button" className=" absolute left-1/2  -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">swap</button>
          </div>

          <div className="w-full mb-1 mt-1">
            <InputBox
              label={"To"}
              amount={convertedAmount}
              selectCurrency={to}
              Currencyoptions={options}
              onCurrencyChange={(currency) => { setTo(currency) }}
              
            />
          </div>

          <button type="submit" onClick={onConvert} className="w-full text-white bg-blue-600 p-3 mt-2 rounded-md">
            Convert {from} to {to}
          </button>

        </form>
      </div>

    </div>

  )
};

export default App;
