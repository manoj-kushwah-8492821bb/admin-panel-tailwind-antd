import Layout from "../../../layouts/index";
import Toggle from "../../../common/Toggle";
import CopyText from "../../../common/CopyText";
import React, { useEffect, useState } from "react";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { userList, userStatus } from "../../../toolkit/action/userAction";

const Users = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { users, fetchLoad } = useSelector((state) => state.userReducer);

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = users?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // handle status
  const handleStatus = (event) => {
    const payload = { userId: event.target.id, status: event.target.checked };
    dispatch(userStatus({ payload, callback: () => dispatch(userList()) }));
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
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y w-full text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  #id
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Phone
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Prime
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Other
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs ">
                    <td className="px-4 py-3">
                      <CopyText value={item._id} />
                    </td>

                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3">{item.phone}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.isPrime ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <Toggle
                        value={item.status}
                        _id={item._id}
                        handleChange={handleStatus}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className=" flex-col flex">
                        <span>Level : {item.level}</span>
                        <span>
                          Balance : ₹ {Math.floor(item.wallet.balance)}
                        </span>
                      </div>
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

export default Layout(Users);
