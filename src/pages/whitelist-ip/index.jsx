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
import {
  affiliateList,
  affiliateRemove,
  ipList,
} from "../../toolkit/action/affiliateAction";

const WhitelistIp = () => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    formModal: false,
    deleteModal: false,
  });
  const [editData, setEditData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { ipAddresses, fetchLoad, loading } = useSelector(
    (state) => state.affiliateReducer
  );

  // handle modals
  const handleOpenModal = (name) => setModals({ ...modals, [name]: true });
  const handleCloseModal = (name) => {
    setEditData();
    setModals({ ...modals, [name]: false });
  };

  // handle remove service
  const handleDeleteService = async () => {
    const response = await dispatch(affiliateRemove(editData._id));
    if (response?.payload?.ResponseStatus == 1) {
      handleCloseModal("deleteModal");
    }
  };

  // Pagination Logic
  const perPageItems = 10;
  const totalItems = ipAddresses?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  // useffect
  useEffect(() => {
    dispatch(ipList());
  }, [dispatch]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between">
        <div>Whitelist IPs</div>
        <Button
          icon={<BsPlus />}
          action={() => handleOpenModal("formModal")}
          text="New IPs"
        />
      </div>

      {/* Table */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Address
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Status
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr ">
                  Action
                </th>
              </tr>
            </thead>
            {fetchLoad ? (
              <td colSpan={6} className="py-6">
                <Loader />
              </td>
            ) : (
              <tbody className="divide-y">
                {ipAddresses?.slice(trimStart, trimEnd).map((item) => {
                  return (
                    <tr key={item._id} className="text-sm ">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">{item.status}</td>
                      <td className="px-4 py-3">{item.ip}</td>
                      <td className="px-4 py-3">
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
            )}
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

export default Layout(WhitelistIp);
