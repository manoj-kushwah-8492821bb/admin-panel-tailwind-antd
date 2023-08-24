import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import ShowError from "../../../common/ShowError";
import ButtonLoader from "../../../common/ButtonLoader";
import { IMAGE_URL } from "../../../utils/endpoints";
import {
  createBanner,
  updateBanner,
} from "../../../toolkit/action/serviceAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const validator = new SimpleReactValidator();
  const [formInput, setFormInput] = useState({ ...editData });
  const { loading } = useSelector((state) => state.serviceReducer);

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
    payload.append("type", formInput.type);
    payload.append("link", formInput.link);
    payload.append("image", formInput.image);
    payload.append("section", formInput.section);

    if (validator.allValid()) {
      if (editData) {
        if (isEdit) {
          dispatch(
            updateBanner({
              payload,
              bannerId: editData._id,
              callback: () => {
                setFormInput({});
                handleCloseModal();
              },
            })
          );
        } else {
          handleCloseModal();
        }
      } else {
        dispatch(
          createBanner({
            payload,
            callback: () => {
              setFormInput({});
              handleCloseModal();
            },
          })
        );
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  // useffect
  useEffect(() => {
    if (editData) {
      const { image, type, link, section } = editData;
      setFormInput({ image, type, link, section });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} Banner
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
            {/* Banner Section */}
            <div className="grid gap-1">
              <label htmlFor="section" className="text-sm">
                Banner Section
              </label>
              <select
                autoComplete="off"
                id="section"
                name="section"
                value={formInput?.section}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              >
                <option>Select Section</option>
                <option value="game">Game</option>
                <option value="service">Service</option>
                <option value="shopping">Shopping</option>
              </select>
              {validator.message("name", formInput?.section, "required")}
              <ShowError data={errors.section} />
            </div>

            {/* Service type */}
            <div className="grid gap-1">
              <label htmlFor="type" className="text-sm">
                Type
              </label>
              <input
                autoComplete="off"
                id="type"
                type="text"
                name="type"
                value={formInput?.type}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {formInput?.type &&
                validator.message("type", formInput?.type, "required")}
              <ShowError data={errors.type} />
            </div>

            {/* Service Link */}
            <div className="grid gap-1">
              <label htmlFor="link" className="text-sm">
                Link
              </label>
              <input
                autoComplete="off"
                id="link"
                type="text"
                name="link"
                value={formInput?.link}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {formInput?.link &&
                validator.message("link", formInput?.link, "required|url")}
              <ShowError data={errors.link} />
            </div>

            {/* Banner image */}
            <div className="grid gap-1">
              <label className="text-sm">Banner</label>
              <div>
                <label
                  htmlFor="image"
                  className="text-xs bg-white cursor-pointer flex flex-col gap-1 justify-center rounded border-dashed border-[1.5px] p-4 items-center"
                >
                  {editData ||
                    (preview && (
                      <img
                        src={
                          editData ? `${IMAGE_URL}${editData?.image}` : preview
                        }
                        alt="image"
                        className="max-h-[90px] mb-1 max-w-[90px] rounded"
                      />
                    ))}
                  <MdOutlineCloudUpload className="text-xl mb-0.5" />
                  {formInput?.image?.section
                    ? formInput?.image.section
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
