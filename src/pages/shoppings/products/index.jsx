import React, { useEffect, useState } from "react";
import Layout from "../../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../toolkit/action/shoppingAction";
import { IMAGE_URL } from "../../../utils/endpoints";
import Toggle from "../../../common/Toggle";
import TopBar from "../../../common/TopBar";
import Pagination from "../../../common/Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { productsList } = useSelector((state) => state.shoppingReducer);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = productsList?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useEffect
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <TopBar title="Products" />
      {/* Table */}
      <div class="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table class="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead className="bg-gray-100 title-font tracking-wider text-sm">
              <tr>
                <th class="px-4 py-3 rounded-tl">Image</th>
                <th class="px-4 py-3">Name</th>
                <th class="px-4 py-3">Description</th>
                <th class="px-4 py-3">Price</th>
                <th class="px-4 py-3">Publish</th>
                <th class="px-4 py-3 rounded-tr ">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productsList?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td class="px-4 py-3">
                      {item.productImage.length > 0 ? (
                        <div class="flex items-center">
                          {item.productImage.slice(0, 3).map((image) => {
                            return (
                              <img
                                class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full border-blue-500 shrink-0"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                                alt=""
                              />
                            );
                          })}
                          {item.productImage.length > 3 && (
                            <p class="flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                              {item.productImage.length - 3}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div class="flex items-center">---</div>
                      )}
                    </td>
                    <td class="px-4 py-3">
                      {item.productName.slice(0, 20)}
                      {item.productName.length > 20 && "..."}
                    </td>
                    <td class="px-4 py-3">
                      {item.productDesc.slice(0, 20)}{" "}
                      {item.productDesc.length > 20 && "..."}
                    </td>
                    <td class="px-4 py-3">
                      <div>
                        <div>Price : {item.productActualPrice}</div>
                        <div>Sale Price : {item.productSalePrice}</div>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <Toggle id={item._id} value={item.isPublish} />
                    </td>
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
          />
        </div>
      </div>
    </>
  );
};

export default Layout(Products);
