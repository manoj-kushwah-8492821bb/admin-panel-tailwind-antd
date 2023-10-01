import ShowError from "../../../common/ShowError";
import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "../../../utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../common/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import {
  categoryList,
  createCategory,
  updateCategory,
} from "../../../toolkit/action/shoppingAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.shoppingReducer);

  //............. validator
  const validator = new SimpleReactValidator({
    className: "text-danger",
    validators: {
      number: {
        message: "The :attribute must be a number.",
        rule: function (val, params, validator) {
          return (
            validator.helpers.testRegex(val, /^\d+$/) &&
            params.indexOf(val) === -1
          );
        },
      },
    },
  });

  //.......... handle Change
  const handleChange = (event) => {
    const { name, type, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setIsEdit(true);
    if (type === "file") {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setFormInput({ ...formInput, [name]: event.target.files[0] });
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  //................. handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("image", formInput.image);
    payload.append("name", formInput.name);
    payload.append("commission", formInput.commission);
    payload.append("description", formInput.description);

    if (validator.allValid()) {
      if (editData) {
        if (isEdit) {
          dispatch(
            updateCategory({
              categoryId: editData._id,
              payload,
              callback: () => {
                setFormInput({});
                setPreview("");
                handleCloseModal();
                dispatch(categoryList());
              },
            })
          );
        } else {
          handleCloseModal();
        }
      } else {
        dispatch(
          createCategory({
            payload,
            callback: () => {
              setFormInput({});
              setPreview("");
              handleCloseModal();
              dispatch(categoryList());
            },
          })
        );
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  //................ useffect
  useEffect(() => {
    if (editData) {
      const { image, name, commission, description } = editData;
      setFormInput({ image, name, commission, description });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/*.................. Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} Category
            </span>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={() => {
                setFormInput({});
                setPreview("");
                handleCloseModal();
              }}
            />
          </div>

          {/*................... Form Inputs */}
          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            {/* Category Title */}
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                autoComplete="off"
                id="name"
                type="text"
                name="name"
                value={formInput?.name}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("name", formInput?.name, "required")}
              <ShowError data={errors.name} />
            </div>

            {/*...................... Service Percent */}
            <div className="grid gap-1">
              <label htmlFor="commission" className="text-sm">
                Charge On Product
              </label>
              <input
                autoComplete="off"
                id="commission"
                type="text"
                name="commission"
                value={formInput?.commission}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "commission",
                formInput?.commission,
                "required|number"
              )}
              <ShowError data={errors.commission} />
            </div>

            {/*................. Category Description */}
            <div className="grid gap-1">
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                autoComplete="off"
                id="description"
                type="text"
                name="description"
                rows={4}
                value={formInput?.description}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "description",
                formInput?.description,
                "required"
              )}
              <ShowError data={errors.description} />
            </div>

            {/*.................. Service image */}
            <div className="grid gap-1">
              <label className="text-sm">Image</label>
              <div>
                <label
                  htmlFor="image"
                  className="text-xs bg-white cursor-pointer flex flex-col gap-1 justify-center rounded border-dashed border-[1.5px] p-4 items-center"
                >
                  {formInput?.image?.name && (
                    <img
                      src={
                        editData && preview
                          ? `${IMAGE_URL}${editData?.image}`
                          : preview
                      }
                      className="h-28 w-full mb-1 object-cover rounded"
                    />
                  )}

                  <MdOutlineCloudUpload className="text-xl mb-0.5" />
                  {formInput?.image?.name
                    ? formInput?.image.name
                    : " Upload Image"}
                </label>
                <input
                  autoComplete="off"
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="rounded py-1.5 px-2 hidden outline-none border"
                />
              </div>
              {validator.message("image", formInput?.image, "required")}
              <ShowError data={errors.image} />
            </div>

            {/*.................... Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-color justify-center flex items-center cursor-pointer tracking-wider py-2 px-4 mt-2 rounded text-white"
            >
              {loading ? <ButtonLoader /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Form;
