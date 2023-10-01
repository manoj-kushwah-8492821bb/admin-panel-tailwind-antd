import React, { useEffect, useState } from "react";
import { MdClose, MdOutlineCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import ShowError from "../../../common/ShowError";
import ButtonLoader from "../../../common/ButtonLoader";
import { IMAGE_URL } from "../../../utils/endpoints";
import {
  addService,
  serviceList,
  updateService,
} from "../../../toolkit/action/serviceAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.serviceReducer);

  // validator
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
    payload.append("icon", formInput.icon);
    payload.append("name", formInput.name);
    payload.append("type", formInput.type);
    payload.append("percent", formInput.percent);
    payload.append("route", formInput.route ? formInput.route : "");
    payload.append("section", formInput.section ? formInput.section : "");

    if (validator.allValid()) {
      if (editData) {
        if (isEdit) {
          dispatch(
            updateService({
              serviceId: editData._id,
              payload,
              callback: () => {
                handleCloseModal();
                dispatch(serviceList());
              },
            })
          );
        } else {
          handleCloseModal();
        }
      } else {
        dispatch(
          addService({
            payload,
            callback: () => {
              handleCloseModal();
              dispatch(serviceList());
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
      const { icon, name, type, percent, section, route } = editData;
      setFormInput({ icon, name, type, percent, section, route });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} Service
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
            {/* Service Title */}
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm">
                Service Name
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

            {/* Service Percent */}
            <div className="grid gap-1">
              <label htmlFor="percent" className="text-sm">
                Percent
              </label>
              <input
                autoComplete="off"
                id="percent"
                type="text"
                name="percent"
                value={formInput?.percent}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message(
                "percent",
                formInput?.percent,
                "required|number"
              )}
              <ShowError data={errors.percent} />
            </div>

            {/* Service route */}
            <div className="grid gap-1">
              <label htmlFor="route" className="text-sm">
                Route
              </label>
              <input
                autoComplete="off"
                id="route"
                type="text"
                name="route"
                value={formInput?.route}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {formInput?.route &&
                validator.message("route", formInput?.route, "required")}
              <ShowError data={errors.route} />
            </div>

            {/* Service section */}
            <div className="grid gap-1">
              <label htmlFor="section" className="text-sm">
                Section
              </label>
              <select
                autoComplete="off"
                id="section"
                name="section"
                value={formInput?.section}
                onChange={handleChange}
                className="rounded appearance-none  py-1.5 px-2 outline-none border"
              >
                <option value="">Select Section</option>
                <option value="travel">Travel</option>
                <option value="finance">Finance</option>
                <option value="recharge">Recharge</option>
              </select>
              {formInput?.section &&
                validator.message("section", formInput?.section, "required")}
              <ShowError data={errors.section} />
            </div>

            {/* Service Discount */}
            <div className="grid gap-1">
              <label htmlFor="type" className="text-sm">
                Type
              </label>
              <select
                autoComplete="off"
                id="type"
                name="type"
                value={formInput?.type}
                onChange={handleChange}
                className="rounded appearance-none  py-1.5 px-2 outline-none border"
              >
                <option>Select Type</option>
                <option value="Discount">Discount</option>
                <option value="GCB">Go Points Cashback</option>
                <option value="Cashback">Cashback</option>
              </select>
              {validator.message("type", formInput?.type, "required")}
              <ShowError data={errors.type} />
            </div>

            {/* Service Icon */}
            <div className="grid gap-1">
              <label className="text-sm">Service Icon</label>
              <div>
                <label
                  htmlFor="images"
                  className="text-xs bg-white cursor-pointer flex flex-col gap-1 justify-center rounded border-dashed border-[1.5px] p-4 items-center"
                >
                  <img
                    src={editData ? `${IMAGE_URL}${editData?.icon}` : preview}
                    alt="icon"
                    className="max-h-[90px] mb-1 max-w-[90px] rounded"
                  />

                  <MdOutlineCloudUpload className="text-xl mb-0.5" />
                  {formInput?.image?.name
                    ? formInput?.image.name
                    : " Upload Image"}
                </label>
                <input
                  autoComplete="off"
                  id="images"
                  type="file"
                  name="icon"
                  accept="image/*"
                  onChange={handleChange}
                  className="rounded py-1.5 px-2 hidden outline-none border"
                />
              </div>
              {validator.message("icon", formInput?.icon, "required")}
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
