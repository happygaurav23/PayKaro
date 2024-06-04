/* eslint-disable react/jsx-no-comment-textnodes */

import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

  function handleSignUp() {
    navigate("/signup");
  }
  function handleSignIn() {
    navigate("/signin");
  }
  return (
    <>
      <div className="shadow h-14 flex justify-between">
        <div className="flex text-3xl font-semibold flex-col justify-center h-full ml-4">
          PayKaro
        </div>
        <div className="flex justify-center mr-2 mt-2">
          <div className="flex flex-col justify-center h-full mr-4">
            <button
              onClick={handleSignUp}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              SignUp
            </button>
          </div>
          <div className="flex flex-col justify-center h-full text-xl">
            <button
              onClick={handleSignIn}
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              SignIn
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
          Pay Unlimited Cashless Transactions
        </h1>
        <p className="mb-6 text-lg text-gray-500">
          Paykaro is an instant real-time payment system developed by NPCI to
          facilitate inter-bank transactions.
        </p>
      </div>
      <div className="flex justify-around mt-4">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Unified Payment Interface
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Unified Payments Interface, commonly referred to as UPI, is an Indian instant payment system as well as protocol developed by the National Payments Corporation of India (NPCI).
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Seamless Transactions
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              The interface facilitates inter-bank peer-to-peer (P2P) and
              person-to-merchant (P2M) transactions and the UPI ID of the
              recipient can be used to transfer money.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
