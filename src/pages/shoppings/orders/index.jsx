import React, { useEffect, useState } from "react";
import Layout from "../../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../toolkit/action/shoppingAction";
import TopBar from "../../../common/TopBar";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";

const Orders = () => {
  const dispatch = useDispatch();
  const { ordersList, fetchLoad } = useSelector(
    (state) => state.shoppingReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  console.log(ordersList);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = ordersList?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <>
      <TopBar title="Orders" />
      <div class="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table class="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Product
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Payment Method
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delivery
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ordersList?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td class="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <img
                          alt={item._id}
                          src={`${IMAGE_URL}${item?.productId?.productImage?.[0]}`}
                          className="w-9 h-9 rounded-full border"
                        />
                        <span>{item?.productId?.productName}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3">{item.paymentMethod}</td>
                    <td class="px-4 py-3">{item.deliveryDate}</td>
                    <td class="px-4 py-3">{item.totalPrice}</td>

                    <td class="px-4 py-3">{item.status}</td>
                    <td class="px-4 py-3"></td>
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
