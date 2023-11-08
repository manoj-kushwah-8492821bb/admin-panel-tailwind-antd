import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel, MdOutlineCheckCircle } from "react-icons/md";

import Layout from "../../../layouts/index";
import Loader from "../../../common/Loader";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import ReasonModal from "../../../common/ReasonModal";
import { kycList, manageKYC } from "../../../toolkit/action/userAction";
import Searchbox from "../../../common/Searchbox";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const KYC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState();
  const [userDateList, setData] = useState();
  const { kycs, fetchLoad } = useSelector((state) => state.userReducer);

  // handle status update
  const handleStatusUpdate = async (id, value) => {
    const payload = { kycId: id, status: value, reason: "" };
    if (value === "Reject") {
      setShowModal(payload);
    } else {
      const response = await dispatch(manageKYC(payload));
      if (response?.payload?.Status) {
        dispatch(kycList());
      }
    }
  };

  // sort unction
  const handleSort = () => {
    const sortedWords = kycs
      .filter((item) => `${item?.userId?.firstName} ${item?.userId?.lastName} `)
      .slice()
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      });

    kycs.filter(
      (item) => `${item?.userId?.firstName} ${item?.userId?.lastName} ` === null
    );
    setData(sortedWords);
  };

  const reverseHandleSort = () => {
    const sortedWords = kycs
      .filter((item) => item.name)
      .slice()
      .sort((a, b) => {
        return `${b?.userId?.firstName} ${b?.userId?.lastName} `.localeCompare(
          `${a?.userId?.firstName} ${a?.userId?.lastName} `,
          undefined,
          {
            sensitivity: "base",
          }
        );
      });

    kycs.filter(
      (item) => `${item?.userId?.firstName} ${item?.userId?.lastName} ` === null
    );
    setData(sortedWords);
  };
  //...................... filter
  const filteredData =
    searchValue.length === 0
      ? userDateList
        ? userDateList
        : kycs
      : kycs.filter((item) =>
          `${item?.userId?.firstName} ${item?.userId?.lastName} `
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

  // useffect
  useEffect(() => {
    dispatch(kycList());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div className="text-[#DC8D00]">KYC Request</div>
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
                <td className="p-4 title-font tracking-wider font-medium text-sm  text-gray-900  bg-gray-100 flex-row items-center flex ">
                  <span className="title-font tracking-wider font-medium text-sm mr-3">
                    User
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
                  Aadhaar
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Pan
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Selfie
                </th>
                {/* <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th> */}
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredData.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          alt={item?.userId?.firstName}
                          src={
                            item?.userId?.avatar
                              ? `${IMAGE_URL}${item?.userId?.avatar}`
                              : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                          }
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          {item?.userId?.firstName} {item?.userId?.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      
                      <div className="flex gap-3">
                        {item.aadhaarFront ? (
                          <img
                            alt={item?.aadhaarFront}
                            src={`${IMAGE_URL}${item?.aadhaarFront}`}
                            className="w-20 h-14 rounded"
                          />
                        ) : (
                          "---"
                        )}
                        {item.aadhaarBack ? (
                          <img
                            alt={item?.aadhaarBack}
                            src={`${IMAGE_URL}${item?.aadhaarBack}`}
                            className="w-20 h-14 rounded"
                          />
                        ) : (
                          "---"
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {" "}
                      {item?.pan ? (
                        <img
                          alt={item?.pan}
                          src={`${IMAGE_URL}${item?.pan}`}
                          className="w-20 h-14 rounded"
                        />
                      ) : (
                        "---"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {item.photo ? (
                        <img
                          alt={item?.photo}
                          src={`${IMAGE_URL}${item?.photo}`}
                          className="w-20 h-14 rounded"
                        />
                      ) : (
                        "---"
                      )}
                    </td>

                    {/* <td className="px-4 py-3">{item.status}</td> */}
                    <td className="px-4 py-3">
                      {item.status !== "Approve" ? (
                        <div className="flex gap-2.5 text-2xl">
                          <MdCancel
                            title="Reject"
                            className="cursor-pointer text-rose-500"
                            onClick={() =>
                              handleStatusUpdate(item._id, "Reject")
                            }
                          />
                          <MdOutlineCheckCircle
                            title="Approve"
                            className="cursor-pointer text-emerald-500"
                            onClick={() =>
                              handleStatusUpdate(item._id, "Approve")
                            }
                          />
                        </div>
                      ) : (
                        <>
                          {item.status === "Approve" ? (
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
        title="KYC"
        handleCancel={() => setShowModal()}
        handleConfirm={async (payload) => {
          const response = await dispatch(manageKYC(payload));
          if (response?.payload?.Status) {
            setShowModal();
            dispatch(kycList());
          }
        }}
      />
    </>
  );
};

export default Layout(KYC);
