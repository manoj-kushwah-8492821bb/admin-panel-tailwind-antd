import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

import Layout from "../../layouts/index";
import Options from "../../common/Options";
import Pagination from "../../common/Pagination";
import {
  ipList,
  ipRemove,
  ipStatusUpdate,
} from "../../toolkit/action/affiliateAction";
import Toggle from "../../common/Toggle";
import { giftCardList } from "../../toolkit/action/userAction";

const GiftCards = () => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    formModal: false,
    deleteModal: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { giftCardsList, fetchLoad } = useSelector(
    (state) => state.userReducer
  );

  //............... Pagination Logic
  const perPageItems = 10;
  const totalItems = giftCardsList?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  //................. useffect
  useEffect(() => {
    dispatch(giftCardList());
  }, [dispatch]);

  return (
    <>
      {/*.......... Top */}
      <div className="flex justify-between">
        <div>Gift Cards</div>
      </div>

      {/*............. Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Code
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Redeemed
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Expiry Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {giftCardsList?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td className="px-4 py-3">
                      {item?.userId?.firstName}
                      {item?.userId?.lastName}
                    </td>
                    <td className="px-4 py-3">{item.code}</td>
                    <td className="px-4 py-3">{item.redeem ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3">
                      {" "}
                      <Moment format="YYYY/MM/DD HH:mm:ss">
                        {item.expiryDate}
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

export default Layout(GiftCards);
