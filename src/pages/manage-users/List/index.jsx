import Layout from "../../../layouts/index";
import Toggle from "../../../common/Toggle";
import CopyText from "../../../common/CopyText";
import React, { useEffect, useState } from "react";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { userList, userStatus } from "../../../toolkit/action/userAction";
import Searchbox from "../../../common/Searchbox";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const Users = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [userDateList, setData] = useState();
  const { users, fetchLoad } = useSelector((state) => state.userReducer);

  // sort unction
  const handleSort = () => {
    const sortedWords = users
      .filter((item) => item?.name)
      .slice()
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      });

    users.filter((item) => item?.name === null);
    setData(sortedWords);
  };

  const reverseHandleSort = () => {
    const sortedWords = users
      .filter((item) => item.name)
      .slice()
      .sort((a, b) => {
        return b.name.localeCompare(a.name, undefined, {
          sensitivity: "base",
        });
      });

    users.filter((item) => item?.name === null);
    setData(sortedWords);
  };
  //...................... filter
  const filteredData =
    searchValue.length === 0
      ? userDateList
        ? userDateList
        : users
      : users.filter((item) =>
          `${item.name} `
            .toLocaleLowerCase()
            .includes(searchValue?.toLocaleLowerCase())
        );

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = filteredData?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  const balances = filteredData.map((item) =>
    item.status ? item.wallet.balance : 0
  );
  const sum = balances.reduce((total, price) => total + price, 0);
  console.log(sum);

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
        <div className="text-[#DC8D00]">Users</div>
        <div className="text-sm">User's Total Balance : ₹ {sum}</div>
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="user's name & phone & email"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y w-full text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  #id
                </th>
                <td className="p-4 title-font tracking-wider font-medium text-sm  text-gray-900  bg-gray-100 flex-row items-center flex ">
                  <span className="title-font tracking-wider font-medium text-sm mr-3">
                    Name
                  </span>
                  <BsArrowUp
                    className="cursor-pointer"
                    onClick={() => {
                      reverseHandleSort();
                    }}
                  />
                  <BsArrowDown
                    className="cursor-poinsubCategoriester"
                    onClick={() => {
                      handleSort();
                    }}
                  />
                </td>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Phone
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Refered By
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
              {filteredData.slice(trimStart, trimEnd).map((item, index) => {
                return (
                  item && (
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
                      <td className="px-4 flex items-center gap-1 py-3">
                        {item?.referBy ? (
                          <CopyText value={item?.referBy?._id} />
                        ) : (
                          "---"
                        )}
                        {item?.referBy?.firstName}
                        {item?.referBy?.lastName}
                      </td>
                      <td className="px-4 py-3">
                        {item.isPrime ? "Yes" : "No"}
                      </td>
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
                  )
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
