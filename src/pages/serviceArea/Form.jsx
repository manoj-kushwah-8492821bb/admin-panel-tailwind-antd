import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import ShowError from "../../common/ShowError";
import ButtonLoader from "../../common/ButtonLoader";
import { IMAGE_URL } from "../../utils/endpoints";
import {
  affiliateCreate,
  affiliateList,
  affiliateUpdate,
} from "../../toolkit/action/affiliateAction";
import {
  createAreas,
  fetchAreas,
  updateAreas,
} from "../../toolkit/action/shoppingAction";

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

    if (validator.allValid()) {
      await dispatch(
        createAreas({
          payload: formInput,
          callback: () => {
            setFormInput({});
            dispatch(fetchAreas());
            handleCloseModal();
          },
        })
      );
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
              {editData ? "Update" : "Add"} Service Area
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
              <label htmlFor="pinCode" className="text-sm">
                Pin Code
              </label>
              <input
                autoComplete="off"
                id="pinCode"
                type="text"
                placeholder="Enter postal code"
                name="pinCode"
                value={formInput?.pinCode}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("pinCode", formInput?.pinCode, "required")}
              <ShowError data={errors.pinCode} />
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
