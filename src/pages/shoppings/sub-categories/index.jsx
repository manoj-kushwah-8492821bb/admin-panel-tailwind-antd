import React, { useEffect, useState } from "react";
import Layout from "../../../layouts";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSubCategory,
  subCategoryList,
} from "../../../toolkit/action/shoppingAction";
import { IMAGE_URL } from "../../../utils/endpoints";
import Form from "./Form";
import { BsArrowDown, BsArrowUp, BsPlus } from "react-icons/bs";
import TopBar from "../../../common/TopBar";
import Pagination from "../../../common/Pagination";
import Options from "../../../common/Options";
import Confrimation from "../../../common/Confirmation";
import Searchbox from "../../../common/Searchbox";

const SubCategories = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    form: false,
    deleteModal: false,
  });
  const [editData, setEditData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [userDateList, setData] = useState();
  const { subCategoriesList, loading, fetchLoad } = useSelector(
    (state) => state.shoppingReducer
  );

  // handle modals
  const handleOpenModal = (name) => {
    setModal({ ...modal, [name]: true });
  };
  const handleCloseModal = (name) => {
    setModal({ ...modal, [name]: false });
  };

  // handle delete
  const handleDelete = async () => {
    dispatch(
      removeSubCategory({
        subCategoryId: editData._id,
        callback: () => handleCloseModal("deleteModal"),
      })
    );
  };

  // sort unction
  const handleSort = () => {
    const sortedWords = subCategoriesList
      .filter((item) => item?.name)
      .slice()
      .sort((a, b) => {
        return a.name.localeCompare(b.name, undefined, {
          sensitivity: "base",
        });
      });

    subCategoriesList.filter((item) => item?.name === null);
    setData(sortedWords);
  };

  const reverseHandleSort = () => {
    const sortedWords = subCategoriesList
      .filter((item) => item.name)
      .slice()
      .sort((a, b) => {
        return b.name.localeCompare(a.name, undefined, {
          sensitivity: "base",
        });
      });

    subCategoriesList.filter((item) => item?.name === null);
    setData(sortedWords);
  };
  //...................... filter
  const filteredData =
    searchValue.length === 0
      ? userDateList
        ? userDateList
        : subCategoriesList
      : subCategoriesList.filter((item) =>
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

  // useEffect
  useEffect(() => {
    dispatch(subCategoryList());
  }, [dispatch]);
  return (
    <>
      <TopBar
        text="New Sub Category"
        title="Sub Categories"
        icon={<BsPlus />}
        action={() => {
          setEditData("");
          handleOpenModal("form");
        }}
      />

      {/* Table */}
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
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 rounded-tr ">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredData.slice(trimStart, trimEnd).map((item) => {
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

      {/* Form Modal */}
      <Form
        isOpen={modal.form}
        editData={editData}
        handleCloseModal={() => handleCloseModal("form")}
      />

      {/* Confirmation Modal */}
      <Confrimation
        title="Sub Category"
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

export default Layout(SubCategories);
