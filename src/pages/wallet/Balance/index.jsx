import Form from "../Form";
import Moment from "react-moment";
import Layout from "../../../layouts";
import Loader from "../../../common/Loader";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminProfile, txn_list } from "../../../toolkit/action/authAction";

const Balance = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("credit");
  const handleActive = (value) => setActive(value);
  const { transactions, fetchLoad, profileData } = useSelector(
    (state) => state.authReducer
  );

  useEffect(() => {
    dispatch(adminProfile());
    dispatch(txn_list("Wallet"));
  }, [dispatch]);

  return (
    <>
      {/*.................... Top */}
      <section className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => handleActive("credit")}
            className={` ${
              active === "credit" ? "bg-color" : "bg-white text-color"
            } text-sm  border border-blue-500 text-color flex items-center gap-0.5 p-1.5 px-3 rounded`}
          >
            Credit
          </button>
          <button
            onClick={() => handleActive("debit")}
            className={` ${
              active === "debit" ? "bg-color" : "bg-white  text-color"
            } text-sm  border border-blue-500 text-color flex items-center gap-0.5 p-1.5 px-3 rounded`}
          >
            Debit
          </button>
        </div>
        <span>Total Balance : {profileData?.wallet?.balance}</span>
      </section>
      <Form active={active} title="Wallet" profileData={profileData} />

      {/*................... Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <div className="p-3 text-color tracking-wider font-semibold">
            Recent History
          </div>
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Credit User
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Type
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Remarks
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Api TxnId
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Req. Time
                </th>
              </tr>
            </thead>
            {fetchLoad ? (
              <td colSpan={6} className="py-6">
                <Loader />
              </td>
            ) : (
              <tbody>
                {transactions?.slice(0, 5).map((item) => {
                  return (
                    <tr key={item._id} className="text-xs capitalize">
                      <td className="px-4 py-3">{item.recipientId}</td>
                      <td className="px-4 py-3">{item.txnType}</td>
                      <td className="px-4 py-3">{item.remarks}</td>
                      <td className="px-4 py-3">{item.txnAmount}</td>
                      <td className="px-4 py-3">{item.txnId}</td>
                      <td
                        className={`px-4 py-3 text-green-500 uppercase font-bold`}
                      >
                        {item.txnStatus}
                      </td>
                      <td className="px-4 py-3">
                        <Moment format="YYYY/MM/DD HH:mm:ss">
                          {item.createdAt}
                        </Moment>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Layout(Balance);
