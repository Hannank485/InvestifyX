import { FaRegMoon } from "react-icons/fa";
import { AiFillMoneyCollect } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaRegSun } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaPercentage } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [dark, isDark] = useState<boolean>(true);
  const [principal, setPrincipal] = useState<number>(10000);
  const [Return, setReturn] = useState<number>(5);
  const [tenure, setTenure] = useState<number>(10);
  const [total, setTotal] = useState<string>();
  const [ReturnPay, setReturnPay] = useState<number>(1);

  //Manages Principal Value
  const handlePrincipalChange = (e: any): void => {
    setPrincipal(e.target.valueAsNumber);
  };

  //Manages Return Value
  const handleReturnChange = (e: any): void => {
    setReturn(e.target.value);
  };

  //Manages tenure Value
  const handleTenureChange = (e: any): void => {
    setTenure(e.target.value);
  };

  //Toggles Dark Mode
  const handleClick = (): void => {
    if (!dark) {
      document.documentElement.classList.add("dark");
    } else if (dark || document.body.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    }
    console.log(document.body.className);
    isDark(!dark);
  };

  //Dark Mode color
  useEffect(() => {
    if (dark) {
      document.body.style.backgroundColor = "#1e1e1e";
    } else {
      document.body.style.backgroundColor = "#f0f0f0";
    }
  }, [dark]);

  //CALCULATION FOR LOAN
  useEffect(() => {
    const amount: number = Math.round(
      principal * Math.pow(1 + Return / 100, tenure)
    );
    setReturnPay(amount - principal);
    setTotal(amount.toLocaleString("en-US"));
  }, [tenure, Return, principal]);
  return (
    <div className="text-dark dark:text-primary ">
      <nav className="flex justify-between items-center px-3 py-4 border-b-2 border-gray-300 dark:border-darkSecondary  ">
        <div className="flex gap-2 items-center text-2xl">
          <AiFillMoneyCollect className="text-2xl" />
          <h1 className=" font-semibold ">
            Investify<span className="text-3xl">X</span>
          </h1>
        </div>
        <div
          className="p-3 hover:bg-[#4DB6AC] cursor-pointer rounded-2xl transition-all"
          onClick={handleClick}
        >
          <FaRegSun className="text-xl dark:hidden " />

          <FaRegMoon className="text-xl hidden dark:block" />
        </div>
      </nav>
      {/* CARDS */}
      <div className="p-4 flex flex-col gap-3 xl:flex-row justify-between">
        {/* Investment DETAIL CARD */}
        <div className="px-4 py-3 bg-[#f5f5f5] rounded-2xl border-2 border-gray-300 dark:border-darkSecondary dark:bg-carddark xl:basis-1/2">
          <h1 className="text-xl font-bold">Investment Details</h1>
          <p className="text-sm text-gray-500">
            Please Enter Your Investment Details
          </p>
          <div className="mt-6 ">
            <p>Principal Amount</p>
            <div className="relative">
              <AiFillDollarCircle className="absolute left-2 top-2.5  text-2xl dark:text-[#4d4d4d]" />
              <input
                type="number"
                value={principal}
                className="inputfield"
                onChange={handlePrincipalChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <p>Rate of Return (p.a)</p>
            <div className="relative">
              <FaPercentage className="absolute left-2 top-2.5  text-2xl dark:text-[#4d4d4d]" />
              <input
                type="number"
                value={Return}
                className="inputfield"
                onChange={handleReturnChange}
              />
            </div>
          </div>
          <div className="mt-6">
            <p>Loan Tenure (Years)</p>
            <div className="relative">
              <MdDateRange className="absolute left-2 top-2.5  text-2xl dark:text-[#4d4d4d]" />
              <input
                type="number"
                value={tenure}
                className="inputfield"
                onChange={handleTenureChange}
              />
            </div>
          </div>
        </div>
        {/* Investment AMOUNT CARD */}
        <div className="flex flex-col gap-5 xl:basis-1/2">
          <div className="px-4 py-3 bg-[#f5f5f5] rounded-2xl border-2 border-gray-300 dark:border-darkSecondary dark:bg-carddark ">
            <h1 className="text-xl font-bold">Investment Breakdown</h1>
            <p className="text-sm text-gray-500">
              Your estimated investment breakdown.
            </p>
            {/* Investment Breakdown Information cards */}
            <div className="flex flex-col items-center justify-center gap-4 xl:flex-row mt-4">
              <div className="cardInfo  ">
                <p className="text-gray-500">Principal Amount</p>
                <p className="text-2xl font-bold">
                  ${principal.toLocaleString("en-US")}
                </p>
              </div>
              <div className="cardInfo  ">
                <p className="text-gray-500">Total Returns</p>
                <p className="text-2xl font-bold">
                  ${ReturnPay.toLocaleString("en-US")}
                </p>
              </div>
              <div className="cardInfo  ">
                <p className="text-gray-500">Total Earnings</p>
                <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 dark:from-orange-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">
                  ${total}
                </p>
              </div>
            </div>
          </div>
          {/* GRAPH CARD*/}
          <div className="px-4 py-3 bg-[#f5f5f5] rounded-2xl border-2 border-gray-300 dark:border-darkSecondary dark:bg-carddark">
            <h1 className="text-xl font-bold">Graphical Representation </h1>
            <p className="text-gray-500">
              Visual representation of Principal vs. Return.
            </p>
            <div className=" md:w-md w-xs h-auto  mx-auto ">
              <Doughnut
                data={{
                  labels: ["Principal", "Return"],
                  datasets: [
                    {
                      label: "Amount",
                      data: [principal, ReturnPay],
                      backgroundColor: ["#90CAF9", "#4DB6AC"],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
