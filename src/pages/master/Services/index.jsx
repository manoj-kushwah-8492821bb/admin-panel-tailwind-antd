import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp, BsPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import {
  removeService,
  serviceList,
  updateService,
} from "../../../toolkit/action/serviceAction";
import Layout from "../../../layouts/index";
import Button from "../../../common/Button";
import Toggle from "../../../common/Toggle";
import Options from "../../../common/Options";
import Searchbox from "../../../common/Searchbox";
import Pagination from "../../../common/Pagination";
import { IMAGE_URL } from "../../../utils/endpoints";
import Confrimation from "../../../common/Confirmation";

const Services = () => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    formModal: false,
    deleteModal: false,
  });
  const [editData, setEditData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userDateList, setData] = useState();
  const { services, fetchLoad, loading } = useSelector(
    (state) => state.serviceReducer
  );

  // sort unction
  const handleSort = () => {
    const sortedWords = services
      .filter((item) => item?.name)
      .slice()
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      });

    services.filter((item) => item?.name === null);
    setData(sortedWords);
  };

  const reverseHandleSort = () => {
    const sortedWords = services
      .filter((item) => item.name)
      .slice()
      .sort((a, b) => {
        return b.name.localeCompare(a.name, undefined, {
          sensitivity: "base",
        });
      });

    services.filter((item) => item?.name === null);
    setData(sortedWords);
  };

  // handle modals
  const handleOpenModal = (name) => setModals({ ...modals, [name]: true });
  const handleCloseModal = (name) => {
    setEditData();
    setModals({ ...modals, [name]: false });
  };

  // handle status update
  const handleStatusUpdate = async (event) => {
    const payload = { status: event.target.checked };
    const response = await dispatch(
      updateService({ serviceId: event.target.id, payload })
    );
    if (response?.payload?.Status) {
      dispatch(serviceList());
    }
  };

  // handle status update
  const handleCouponUpdate = async (event, id) => {
    const payload = { isCoupon: event.target.checked };
    const response = await dispatch(updateService({ serviceId: id, payload }));
    if (response?.payload?.Status) {
      dispatch(serviceList());
    }
  };

  // handle remove service
  const handleDeleteService = () => {
    dispatch(
      removeService({
        serviceId: editData._id,
        callback: () => {
          handleCloseModal("deleteModal");
          dispatch(serviceList());
        },
      })
    );
  };

  // filtered data
  const filteredData =
    searchValue.length === 0
      ? userDateList
        ? userDateList
        : services
      : services.filter((item) =>
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

  // useffect
  useEffect(() => {
    dispatch(serviceList());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div className="text-[#DC8D00]"> Services</div>
        <Button
          icon={<BsPlus />}
          action={() => handleOpenModal("formModal")}
          text="New Service"
        />
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="service name"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Image
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
                  Offer
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Coupon
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredData.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id}>
                    <td className="px-4 py-2">
                      <img
                        alt={item._id}
                        src={`${IMAGE_URL}${item.icon}`}
                        className="w-9 h-9 object-cover border rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">
                      <div class="inline px-3 py-1 text-xs font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 ">
                        {item.percent && `${item.percent}%`}
                        {item.type === "Cashback"
                          ? "CB"
                          : item.type === "Discount"
                          ? "DC"
                          : "GCB"}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <Toggle
                        _id={item._id}
                        value={item.status}
                        handleChange={handleStatusUpdate}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Toggle
                        _id={item._id + item._id}
                        value={item.isCoupon}
                        handleChange={(event) =>
                          handleCouponUpdate(event, item._id)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <Options
                        handleEdit={() => {
                          setEditData(item);
                          handleOpenModal("formModal");
                        }}
                        handleDelete={() => {
                          setEditData(item);
                          handleOpenModal("deleteModal");
                        }}
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

      {/* Form */}
      <Form
        isOpen={modals.formModal}
        handleCloseModal={() => handleCloseModal("formModal")}
        editData={editData}
      />

      {/* Confirmation */}
      <Confrimation
        isOpen={modals.deleteModal}
        editData={editData}
        loading={loading}
        handleConfirm={handleDeleteService}
        handleCancel={() => handleCloseModal("deleteModal")}
      />
    </>
  );
};

export default Layout(Services);
