import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../layouts/index";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import { userList } from "../../../toolkit/action/userAction";

const Users = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { users } = useSelector((state) => state.userReducer);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = users?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div>Users</div>
      </div>

      {/* Table */}
      <div class="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table class="table-auto divide-y w-full text-left whitespace-nowrap">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  #id
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Name
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Phone
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Other
                </th>

                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs ">
                    <td class="px-4 py-3">{item.referalId}</td>

                    <td class="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          alt={item._id}
                          src={
                            item.avatar
                              ? `${IMAGE_URL}${item.avatar}`
                              : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                          }
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          {item.firstName} {item.lastName}
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3">{item.phone}</td>
                    <td class="px-4 py-3">{item.email}</td>
                    <td class="px-4 py-3">
                      <div className=" flex-col flex">
                        <span>Level : {item.level}</span>
                        <span>Balance : ₹ {item.wallet.balance}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3">Action</td>
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

export default Layout(Users);
