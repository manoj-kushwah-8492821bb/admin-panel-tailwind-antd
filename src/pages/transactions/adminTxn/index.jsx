import Moment from "react-moment";
import Layout from "../../../layouts/index";
import CopyText from "../../../common/CopyText";
import DateRange from "../../../common/DateRange";
import Pagination from "../../../common/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { txn_list } from "../../../toolkit/action/authAction";

const AdminTransaction = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All");
  const [formInput, setFormInput] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions, fetchLoad } = useSelector((state) => state.authReducer);

  // handle change
  const handleChange = (event) => {
    setActiveTab("All");
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // handleFilter
  const result =
    formInput.from || activeTab !== "All"
      ? transactions.filter((item) => {
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
      : transactions;

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
    dispatch(txn_list());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div className="text-[#DC8D00]"> Admin Transaction</div>
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
            {["All", "Wallet", "GoPoints", "PrimePoints"].map((item) => (
              <div
                onClick={() => {
                  setFormInput({ from: "", to: "" });
                  setActiveTab(item);
                }}
                className={`cursor-pointer ${
                  activeTab === item && "text-[#DC8D00] border-b border-[#DC8D00]"
                } hover:text-[#DC8D00] hover:border-b hover:border-[#DC8D00]`}
              >
                {item}
              </div>
            ))}
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
                    <td className="px-4 flex items-center gap-2 py-3">
                      <CopyText
                        value={
                          item.txnType === "credit"
                            ? item.recipientId
                            : item?.recipientId?._id
                        }
                      />
                      <span>
                        {item.txnType === "credit"
                          ? "Admin"
                          : `${item?.recipientId?.firstName} ${item?.recipientId?.lastName}`}
                      </span>
                    </td>
                    <td className="px-4 py-3">{item.txnType}</td>
                    <td className="px-4 py-3">{item.remarks}</td>
                    <td className="px-4 py-3">
                      {(item.txnResource === "Wallet" ||
                        item.txnResource === "Foundation") &&
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

export default Layout(AdminTransaction);
