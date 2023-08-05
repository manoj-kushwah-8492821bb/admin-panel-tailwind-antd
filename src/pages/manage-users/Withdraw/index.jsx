import { MdCancel, MdOutlineCheckCircle } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../layouts/index";
import { IMAGE_URL } from "../../../utils/endpoints";
import Pagination from "../../../common/Pagination";
import ReasonModal from "../../../common/ReasonModal";
import {
  manageWithdraw,
  withdrawList,
} from "../../../toolkit/action/userAction";

const Withdraw = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState();
  const { withdraws } = useSelector((state) => state.userReducer);

  // handle status update
  const handleStatusUpdate = (id, value) => {
    const payload = { withdrawId: id, status: value, message: "" };
    if (value === "reject") {
      setShowModal(payload);
    } else {
      dispatch(manageWithdraw(payload));
    }
  };

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = withdraws?.length;
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
      <div class="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table class="table-auto divide-y whitespace-nowrap  w-full text-left">
            <thead>
              <tr>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  User Details
                </th>
                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Bank Details
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
              {withdraws?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td class="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            item.userId.avatar
                              ? `${IMAGE_URL}${item.userId.avatar}`
                              : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                          }
                          className="w-8 h-8 rounded-full"
                        />{" "}
                        <div>
                          {item.userId.firstName} {item.userId.lastName}
                        </div>
                      </div>
                    </td>
                    <td class="px-4 flex flex-col text-xs py-3">
                      <div className="flex gap-3">
                        <span className="font-semibold">Bank :</span>
                        <span>{item.bankId.bankName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Account :</span>
                        <span>{item.bankId.accountNo}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Branch :</span>
                        <span>{item.bankId.branchName}</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="font-semibold">Holder :</span>
                        <span>{item.bankId.holderName}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3">
                      <div className="flex gap-3">₹ {item.amount}</div>
                    </td>

                    <td class="px-4 py-3 text-xs uppercase">{item.status}</td>
                    <td class="px-4 py-3">
                      <div className="flex gap-2.5 text-2xl">
                        <MdCancel
                          title="Reject"
                          className="cursor-pointer text-rose-500"
                          onClick={() => handleStatusUpdate(item._id, "reject")}
                        />
                        <MdOutlineCheckCircle
                          title="Approve"
                          className="cursor-pointer text-emerald-500"
                          onClick={() =>
                            handleStatusUpdate(item._id, "approved")
                          }
                        />
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
          />
        </div>
      </div>

      {/* Reason Modal */}
      <ReasonModal
        isOpen={showModal}
        title="Withdraw"
        handleCancel={() => setShowModal()}
        handleConfirm={(payload) => {
          dispatch(manageWithdraw(payload, () => setShowModal()));
        }}
      />
    </>
  );
};

export default Layout(Withdraw);
