import Form from "./Form";
import Layout from "../../../layouts";
import { BsPlus } from "react-icons/bs";
import TopBar from "../../../common/TopBar";
import Options from "../../../common/Options";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  removeCategory,
} from "../../../toolkit/action/shoppingAction";
import { IMAGE_URL } from "../../../utils/endpoints";
import Pagination from "../../../common/Pagination";
import Confrimation from "../../../common/Confirmation";
import Searchbox from "../../../common/Searchbox";

const Categories = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    form: false,
    deleteModal: false,
  });
  const [editData, setEditData] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { categoriesList, loading, fetchLoad } = useSelector(
    (state) => state.shoppingReducer
  );

  //............ handle modals
  const handleOpenModal = (name) => {
    setModal({ ...modal, [name]: true });
  };
  const handleCloseModal = (name) => {
    setModal({ ...modal, [name]: false });
  };

  //............. handle delete
  const handleDelete = async () => {
    const response = await dispatch(removeCategory(editData._id));
    if (response?.payload?.Status) {
      handleCloseModal("deleteModal");
    }
  };

  // handleFilter
  const filteredData = categoriesList.filter(
    (item) =>
      item.name && item.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const data = searchValue ? filteredData : categoriesList;

  //...................... Pagination Logic
  const perPageItems = 10;
  const totalItems = data?.length;
  const trimStart = (currentPage - 1) * perPageItems;
  const trimEnd = trimStart + perPageItems;
  const handlePrev = () => currentPage !== 1 && setCurrentPage(currentPage - 1);
  const handleForw = () => {
    trimEnd <= totalItems && setCurrentPage(currentPage + 1);
  };

  //.................. useEffect
  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);
  return (
    <>
      <TopBar
        text="New Category"
        title="Categories"
        icon={<BsPlus />}
        action={() => {
          setEditData("");
          handleOpenModal("form");
        }}
      />

      {/*................. Table Data */}
      <div className="w-full bg-white my-3 rounded shadow-md p-3 mx-auto overflow-auto">
        <Searchbox
          title="name"
          value={searchValue}
          handleChange={(event) => setSearchValue(event?.target?.value)}
        />
        <div className="rounded text-left whitespace-no-wrap w-full border overflow-auto">
          <table className="table-auto divide-y whitespace-nowrap w-full text-left">
            <thead className="bg-gray-100 title-font tracking-wider text-sm">
              <tr>
                <th className="px-4 py-3 rounded-tl">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Charge</th>
                <th className="px-4 py-3 rounded-tr ">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data?.slice(trimStart, trimEnd).map((item) => {
                return (
                  <tr key={item._id} className="text-sm ">
                    <td className="px-4 py-3">
                      <img
                        alt={item._id}
                        src={`${IMAGE_URL}${item.image}`}
                        className="w-9 h-9 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3">{item.commission}%</td>
                    <td className="px-4 py-3">
                      <Options
                        handleDelete={() => {
                          setEditData(item);
                          handleOpenModal("deleteModal");
                        }}
                        handleEdit={() => {
                          setEditData(item);
                          handleOpenModal("form");
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

      {/*................. Form Modal */}
      <Form
        editData={editData}
        isOpen={modal.form}
        handleCloseModal={() => handleCloseModal("form")}
      />

      {/*................... Confirmation Modal */}
      <Confrimation
        title="Category"
        isOpen={modal.deleteModal}
        handleCancel={() => {
          setEditData({});
          handleCloseModal("deleteModal");
        }}
        handleConfirm={handleDelete}
        loading={loading}
      />
    </>
  );
};

export default Layout(Categories);
