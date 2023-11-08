import React, { useEffect, useState } from "react";
import Layout from "../../layouts";
import Moment from "react-moment";
import Pagination from "../../common/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { bbpsHistory } from "../../toolkit/action/reportAction";

const Reports = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { bbps, fetchLoad } = useSelector((state) => state.reportReducer);

  console.log(bbps);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = bbps?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // text color
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

  // useffect
  useEffect(() => {
    dispatch(bbpsHistory());
  }, [dispatch]);
  return (
    <div>
      {/* Top */}
      <div className="flex justify-between">
        <div className="text-[#DC8D00]">BBPS Reports</div>
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Operator
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Circle
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Number
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
            <tbody>
              {bbps?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs">
                    <td className="px-4 py-3">
                      {item?.userId?.firstName} {item?.userId?.lastName}
                    </td>
                    <td className="px-4 py-3">{item.operator}</td>
                    <td className="px-4 py-3">{item.circle}</td>
                    <td className="px-4 py-3">{item.number}</td>
                    <td className="px-4 py-3">₹ {item.amount}</td>
                    <td className="px-4 py-3">{item.apiTransID}</td>
                    <td
                      className={`px-4 py-3 ${colors(
                        item.status
                      )} uppercase font-bold`}
                    >
                      {item.status}
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
            fetchLoad={fetchLoad}
            handleForw={handleForw}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout(Reports);
