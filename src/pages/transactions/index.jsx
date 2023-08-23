import Moment from "react-moment";
import Loader from "../../common/Loader";
import Layout from "../../layouts/index";
import Pagination from "../../common/Pagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { txn_list } from "../../toolkit/action/authAction";

const Transaction = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { transactions, fetchLoad } = useSelector((state) => state.authReducer);

  //................. Pagination Logic
  const perPageItems = 10;
  const totalItems = transactions?.length;
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
        <div>Transaction</div>
      </div>

      {/*................ Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
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
            {fetchLoad ? (
              <td colSpan={6} className="py-6">
                <Loader />
              </td>
            ) : (
              <tbody>
                {transactions?.slice(trimStart, trimEnd).map((item) => {
                  return (
                    <tr key={item._id} className="text-xs capitalize">
                      <td className="px-4 py-3">{item.recipientId}</td>
                      <td className="px-4 py-3">{item.txnType}</td>
                      <td className="px-4 py-3">{item.remarks}</td>
                      <td className="px-4 py-3">{item.txnAmount}</td>
                      <td className="px-4 py-3">{item.txnResource}</td>
                      <td className="px-4 py-3">{item.txnId}</td>
                      <td
                        className={`px-4 py-3 text-green-500 uppercase font-bold`}>
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
          <Pagination
            handlePrev={handlePrev}
            from={trimStart}
            to={trimEnd}
            total={totalItems}
            handleForw={handleForw}
          />
        </div>
      </div>
    </>
  );
};

export default Layout(Transaction);
