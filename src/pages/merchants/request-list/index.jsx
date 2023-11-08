import React, { useEffect, useState } from "react";
import Layout from "../../../layouts";
import TopBar from "../../../common/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  merchantList,
  merchantSatusUpdate,
} from "../../../toolkit/action/userAction";
import { useNavigate } from "react-router-dom";
import Searchbox from "../../../common/Searchbox";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";

const RequestList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { merchants, fetchLoad } = useSelector((state) => state.userReducer);

  const list = merchants.filter((item) => item.status !== "accept");

  // handleFilter
  const filteredData = list.filter(
    (item) =>
      item?.userId?.firstName &&
      item?.userId?.firstName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const data = searchValue ? filteredData : list;

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = data?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  const handleStatusUpdate = (payload) => {
    dispatch(
      merchantSatusUpdate({
        payload,
        callback: () => navigate("/merchants/request-list"),
      })
    );
  };

  // useffect
  useEffect(() => {
    dispatch(merchantList());
  }, [dispatch]);

  return (
    <div>
      <TopBar title="Request List" />
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="merchant's name"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y w-full text-left whitespace-nowrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Business
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  About
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Shop Time
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Address
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-xs ">
                    <td className="px-4 py-3">
                      <div>
                        {item.userId.firstName} {item.userId.lastName}
                      </div>
                      <a
                        href={`tel:+91${item.userId.phone}`}
                        target="_blank"
                        className="text-color underline"
                      >
                        +91{item.userId.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          alt={item._id}
                          src={
                            item.image
                              ? `${IMAGE_URL}${item.image}`
                              : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                          }
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          {" "}
                          <div>{item.businessName}</div>
                          <a
                            href={`https://wa.me/91${item.waNumber}`}
                            target="_blank"
                            className="text-color underline"
                          >
                            WA : +91{item.waNumber}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {item.about?.slice(0, 20)}
                      {item?.about?.length > 20 && "..."}
                    </td>
                    <td className="px-4 py-3">
                      {item?.businessTimeFrom} - {item?.businessTimeTo}
                    </td>
                    <td className="px-4 py-3">
                      {item.storeAddress}, {item.city}, {item.state}{" "}
                      {item.postalCode}
                    </td>
                    <td className="px-4 py-3">
                      {item.status === "reject" ? (
                        <span className="py-1 text-white px-3 rounded-full uppercase bg-red-400">
                          Rejected
                        </span>
                      ) : (
                        // ..............Button
                        <div className="flex text-xs gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate({
                                status: "accept",
                                userId: item.userId._id,
                              })
                            }
                            className="bg-color text-xs uppercase flex items-center gap-0.5 p-1.5 px-3 rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate({
                                status: "reject",
                                userId: item.userId._id,
                              })
                            }
                            className="bg-gray-200 text-xs uppercase flex items-center gap-0.5 p-1.5 px-3 rounded"
                          >
                            Reject
                          </button>
                        </div>
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

export default Layout(RequestList);
