import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel, MdOutlineCheckCircle } from "react-icons/md";

import Layout from "../../../layouts/index";
import Loader from "../../../common/Loader";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import ReasonModal from "../../../common/ReasonModal";
import {
  manageWithdraw,
  withdrawList,
} from "../../../toolkit/action/userAction";
import Searchbox from "../../../common/Searchbox";

const Withdraw = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { withdraws, fetchLoad } = useSelector((state) => state.userReducer);

  // handle status update
  const handleStatusUpdate = async (id, value) => {
    const payload = { withdrawId: id, status: value, message: "" };
    if (value === "reject") {
      setShowModal(payload);
    } else {
      const response = await dispatch(manageWithdraw(payload));
      if (response?.payload?.Status) {
        dispatch(withdrawList());
      }
    }
  };

  // handleFilter
  const filteredData = withdraws.filter(
    (item) =>
      item?.userId?.firstName &&
      item?.userId?.firstName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const data = searchValue ? filteredData : withdraws;

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = data?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(withdrawList());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div>Withdraw Request</div>
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="user's name"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap  w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User Details
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Bank Details
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Amount
                </th>

                {/* <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th> */}

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {data?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item?._id} className="text-sm ">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            item?.userId?.avatar
                              ? `${IMAGE_URL}${item?.userId?.avatar}`
                              : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                          }
                          className="w-8 h-8 rounded-full"
                        />{" "}
                        <div>
                          {item?.userId?.firstName} {item?.userId?.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 flex flex-col text-xs py-3">
                      <div className="flex gap-3">
                        <span className="font-semibold">Bank :</span>
                        <span>{item?.bankId?.bankName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Account :</span>
                        <span>{item?.bankId?.accountNo}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Branch :</span>
                        <span>{item?.bankId?.branchName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Holder :</span>
                        <span>{item?.bankId?.holderName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">IFSC :</span>
                        <span>{item?.bankId?.ifsc}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">₹ {item?.amount}</div>
                    </td>

                    {/* <td className="px-4 py-3 text-xs uppercase">{item.status}</td> */}
                    <td className="px-4 py-3">
                      {item.status === "requested" ? (
                        <div className="flex gap-2.5 text-2xl">
                          <MdCancel
                            title="Reject"
                            className="cursor-pointer text-rose-500"
                            onClick={() =>
                              handleStatusUpdate(item._id, "reject")
                            }
                          />
                          <MdOutlineCheckCircle
                            title="Approve"
                            className="cursor-pointer text-emerald-500"
                            onClick={() =>
                              handleStatusUpdate(item._id, "approved")
                            }
                          />
                        </div>
                      ) : (
                        <>
                          {item.status === "approved" ? (
                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                              Approved
                            </div>
                          ) : (
                            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 ">
                              Rejected
                            </div>
                          )}
                        </>
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
            handleForw={handleForw}
            fetchLoad={fetchLoad}
          />
        </div>
      </div>

      {/* Reason Modal */}
      <ReasonModal
        isOpen={showModal}
        title="Withdraw"
        handleCancel={() => setShowModal()}
        handleConfirm={async (payload) => {
          const response = await dispatch(manageWithdraw(payload));
          if (response?.payload?.Status) {
            setShowModal();
            dispatch(withdrawList());
          }
        }}
      />
    </>
  );
};

export default Layout(Withdraw);
