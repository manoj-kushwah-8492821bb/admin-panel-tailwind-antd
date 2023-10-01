import Moment from "react-moment";
import Layout from "../../layouts/index";
import CopyText from "../../common/CopyText";
import DateRange from "../../common/DateRange";
import Pagination from "../../common/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTransaction } from "../../toolkit/action/reportAction";

const Transaction = () => {
  const dispatch = useDispatch();
  const [formInput, setFormInput] = useState({});
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const { allTxn, fetchLoad } = useSelector((state) => state.reportReducer);

  // handle change
  const handleChange = (event) => {
    setActiveTab("All");
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // handleFilter
  const result =
    formInput.from || activeTab !== "All"
      ? allTxn.filter((item) => {
          const to = formInput.to
            ? new Date(formInput.to).getTime()
            : new Date().getTime();
          const from = new Date(formInput.from).getTime();
          const createdAt = new Date(item.createdAt).getTime();
          if (formInput.from) {
            return from <= createdAt && to >= createdAt;
          } else {
            return activeTab.toLowerCase() === item.txnResource.toLowerCase();
          }
        })
      : allTxn;

  //................. Pagination Logic
  const perPageItems = 10;
  const totalItems = result?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  //................... text color
  const colors = (value) => {
    switch (value) {
      case "Failure":
        return "text-red-500";

      case "FAILURE":
        return "text-red-500";

      case "Success":
        return "text-green-500";

      case "Pending":
        return "text-yellow-500";

      default:
        break;
    }
  };

  //..................... useffect
  useEffect(() => {
    dispatch(allTransaction());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div>Transaction</div>
      </div>

      {/*................ Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <DateRange
          formInput={formInput}
          handleChange={(event) => handleChange(event)}
          handleReset={() => setFormInput({ from: "", to: "" })}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          {/* Tabs */}
          <div className="flex gap-3 px-4 py-2">
            {["All", "Wallet", "GoPoints", "PrimePoints", "Online"].map(
              (item) => (
                <div
                  onClick={() => {
                    setFormInput({ from: "", to: "" });
                    setActiveTab(item);
                  }}
                  className={`cursor-pointer ${
                    activeTab === item &&
                    "text-blue-500 border-b border-blue-500"
                  } hover:text-blue-500 hover:border-b hover:border-blue-500`}
                >
                  {item}
                </div>
              )
            )}
          </div>
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Receipent
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
                  Amount Type
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Txn Id
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Req. Time
                </th>
              </tr>
            </thead>

            <tbody>
              {result?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs capitalize">
                    <td className="px-4 py-3">
                      {item?.recipientId ? (
                        <div className="flex gap-2">
                          <CopyText value={item?.recipientId?._id} />
                          {item?.recipientId?.firstName}
                          {item?.recipientId?.lastName}
                        </div>
                      ) : (
                        "---"
                      )}
                    </td>
                    <td className="px-4 py-3">{item.txnType}</td>
                    <td className="px-4 py-3">
                      {item.txnDesc.slice(0, 20)}
                      {item.txnDesc.length > 20 && "..."}
                    </td>
                    <td className="px-4 py-3">
                      {(item.txnResource === "Wallet" ||
                        item.txnResource === "Online") &&
                        "₹"}{" "}
                      {item.txnAmount}
                    </td>
                    <td className="px-4 py-3">{item.txnResource}</td>
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
          </table>
          <Pagination
            handlePrev={handlePrev}
            from={trimStart}
            to={trimEnd}
            total={totalItems}
            handleForw={handleForw}
            fetchLoad={fetchLoad}
          />
        </div>
      </div>
    </>
  );
};

export default Layout(Transaction);
