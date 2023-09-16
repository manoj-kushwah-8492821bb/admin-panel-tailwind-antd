import { BsPlus } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "./Form";
import Layout from "../../layouts/index";
import Button from "../../common/Button";
import Options from "../../common/Options";
import { IMAGE_URL } from "../../utils/endpoints";
import Pagination from "../../common/Pagination";
import Confrimation from "../../common/Confirmation";
import Loader from "../../common/Loader";
import { affiliateRemove } from "../../toolkit/action/affiliateAction";
import { useNavigate } from "react-router-dom";
import {
  deleteAreas,
  fetchAreas,
  updateAreas,
} from "../../toolkit/action/shoppingAction";
import Toggle from "../../common/Toggle";

const ServiceArea = () => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    formModal: false,
    deleteModal: false,
  });
  const [editData, setEditData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { serviceAreaList, fetchLoad, loading } = useSelector(
    (state) => state.shoppingReducer
  );

  // handle modals
  const handleOpenModal = (name) => setModals({ ...modals, [name]: true });
  const handleCloseModal = (name) => {
    setEditData();
    setModals({ ...modals, [name]: false });
  };

  // handle remove service
  const handleDeleteService = () => {
    dispatch(
      deleteAreas({
        areaId: editData._id,
        callback: () => {
          handleCloseModal("deleteModal");
          dispatch(fetchAreas());
        },
      })
    );
  };

  // handle remove service
  const handleUpdateService = (event) => {
    dispatch(
      updateAreas({
        payload: { pinCodeId: event.target.id, status: event.target.checked },
        callback: () => dispatch(fetchAreas()),
      })
    );
  };

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = serviceAreaList?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div>Service Area</div>
        <Button
          icon={<BsPlus />}
          action={() => {
            setEditData("");
            handleOpenModal("formModal");
          }}
          text="New Area"
        />
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Pin
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delivery Charge
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {serviceAreaList?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td className="px-4 py-3">{item.pinCode}</td>
                    <td className="px-4 py-3">₹ {item.deliveryCharge}/-</td>
                    <td className="px-4 py-3">
                      <Toggle
                        _id={item._id}
                        value={item.status}
                        handleChange={handleUpdateService}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <Options
                        handleDelete={() => {
                          setEditData(item);
                          handleOpenModal("deleteModal");
                        }}
                        handleEdit={() => {
                          setEditData(item);
                          handleOpenModal("formModal");
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

export default Layout(ServiceArea);
