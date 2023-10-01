import moment from "moment";
import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";
import Options from "../../../common/Options";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../toolkit/action/shoppingAction";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ordersList, fetchLoad } = useSelector(
    (state) => state.shoppingReducer
  );
  const [currentPage, setCurrentPage] = useState(1);

  //............... Pagination Logic
  const perPageItems = 10;
  const totalItems = ordersList?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };
  //...................UseEffect
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <>
      <TopBar title="Orders" />
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Product
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Action By
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delivery Date
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ordersList?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <img
                          alt={item._id}
                          src={`${IMAGE_URL}${item?.productId?.productImage?.[0]}`}
                          className="w-9 h-9 rounded-full border"
                        />
                        <span>
                          {item?.productId?.productName.slice(0, 17)}
                          {item?.productId?.productName.length > 17 && "..."}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.actionBy ? item.actionBy : "---"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {moment(item.deliveryDate).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className="px-4 py-3">₹ {item.totalPrice}</td>
                    <td className="px-4 py-3 uppercase ">
                      <div className="py-0.5 px-1 text-[11px] rounded-full bg-gray-100 text-center">
                        {item.status}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Options
                        handleView={() =>
                          navigate("/shopping/order/view", { state: item })
                        }
                      />
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

export default Layout(Orders);
