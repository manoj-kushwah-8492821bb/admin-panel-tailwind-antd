import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import ShowError from "../../common/ShowError";
import ButtonLoader from "../../common/ButtonLoader";
import { IMAGE_URL } from "../../utils/endpoints";
import {
  affiliateCreate,
  affiliateUpdate,
} from "../../toolkit/action/affiliateAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.serviceReducer);

  // validator
  const validator = new SimpleReactValidator();

  // handle Change
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

  // handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    payload.append("name", formInput.name);
    payload.append("link", formInput.link);
    payload.append("image", formInput.image);
    payload.append("description", formInput.description);

    if (validator.allValid()) {
      if (editData) {
        if (isEdit) {
          const response = await dispatch(
            affiliateUpdate({ payload, affiliateId: editData._id })
          );
          if (response?.payload?.ResponseStatus == 1) {
            handleCloseModal();
          }
        } else {
          handleCloseModal();
        }
      } else {
        const response = await dispatch(affiliateCreate(payload));
        if (response?.payload?.ResponseStatus == 1) {
          handleCloseModal();
        }
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  // useffect
  useEffect(() => {
    if (editData) {
      const { image, name, description, link } = editData;
      setFormInput({ image, name, description, link });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} Affiliate Store
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

          {/* Form Inputs */}
          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            {/*  Title */}
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                autoComplete="off"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={formInput?.name}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("name", formInput?.name, "required")}
              <ShowError data={errors.name} />
            </div>

            {/*  Link */}
            <div className="grid gap-1">
              <label htmlFor="link" className="text-sm">
                Link
              </label>
              <input
                autoComplete="off"
                id="link"
                type="text"
                name="link"
                placeholder="Link"
                value={formInput?.link}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("link", formInput?.link, "required|url")}
              <ShowError data={errors.link} />
            </div>

            {/* Discription */}
            <div className="grid gap-1">
              <label htmlFor="description" className="text-sm">
                Discription
              </label>
              <textarea
                autoComplete="off"
                id="description"
                name="description"
                rows={4}
                value={formInput?.description}
                onChange={handleChange}
                placeholder="Description"
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "description",
                formInput?.description,
                "required"
              )}
              <ShowError data={errors.description} />
            </div>

            {/* Service Icon */}
            <div className="grid gap-1">
              <label className="text-sm">Image</label>
              <div>
                <label
                  htmlFor="image"
                  className="text-xs bg-white cursor-pointer flex flex-col gap-1 justify-center rounded border-dashed border-[1.5px] p-4 items-center"
                >
                  {(editData || preview) && (
                    <img
                      src={
                        editData ? `${IMAGE_URL}${editData?.image}` : preview
                      }
                      alt="icon"
                      className="max-h-[90px] mb-1 max-w-[90px] rounded"
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

            {/* Button */}
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
