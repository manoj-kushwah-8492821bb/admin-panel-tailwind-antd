import React, { useEffect, useState } from "react";
import Layout from "../../../layouts";
import {
  rechargeRefundAccept,
  rechargeRefundList,
} from "../../../toolkit/action/rechargeAction";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../common/Pagination";
import Loader from "../../../common/Loader";
import Moment from "react-moment";
import Button from "../../../common/Button";

const RechargeRefund = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { rechargeRefunds, fetchLoad } = useSelector(
    (state) => state.rechargeReducer
  );

  // handle recharge refund accept
  const handleAcceptRefund = async (value) => {
    const payload = { rechargeId: value };
    const response = await dispatch(rechargeRefundAccept(payload));
    if (response?.payload?.Status) {
      dispatch(rechargeRefundList());
    }
  };

  //  Logic
  const perPageItems = 10;
  const totalItems = rechargeRefunds?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(rechargeRefundList());
  }, [dispatch]);

  return (
    <div>
      <div className="text-[#DC8D00]">Recharges Refund Requests</div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  UserId
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
                  Req. Time
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {rechargeRefunds?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs">
                    <td className="px-4 py-3">{item.userId._id}</td>
                    <td className="px-4 py-3">{item.operator}</td>
                    <td className="px-4 py-3">{item.circle}</td>
                    <td className="px-4 py-3">{item.number}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3">{item.apiTransID}</td>
                    <td className="px-4 py-3">
                      <Moment format="YYYY/MM/DD HH:mm:ss">
                        {item.createdAt}
                      </Moment>
                    </td>
                    <td className="px-4 py-3">
                      {item.status === "Requested" &&
                      item.status != "Refunded" ? (
                        <Button
                          action={() => handleAcceptRefund(item._id)}
                          text="Refund"
                        />
                      ) : (
                        ""
                      )}
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

export default Layout(RechargeRefund);
