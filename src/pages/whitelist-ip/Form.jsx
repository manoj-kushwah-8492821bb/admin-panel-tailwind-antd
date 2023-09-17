import { MdClose } from "react-icons/md";
import ShowError from "../../common/ShowError";
import React, { useEffect, useState } from "react";
import ButtonLoader from "../../common/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { ipCreate, ipUpdate } from "../../toolkit/action/affiliateAction";

const Form = ({ handleCloseModal, isOpen, editData }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.serviceReducer);

  //................... validator
  const validator = new SimpleReactValidator({
    validators: {
      ip: {
        message: "The :attribute must be a valid IP address.",
        rule: function (val, params, validator) {
          return (
            validator.helpers.testRegex(
              val,
              /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i
            ) && params.indexOf(val) === -1
          );
        },
      },
    },
  });

  //........................ handle Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({ ...errors, [name]: "" });
    setIsEdit(true);
    setFormInput({ ...formInput, [name]: value });
  };

  //.......................... handle Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validator.allValid()) {
      if (editData) {
        if (isEdit) {
          const response = await dispatch(
            ipUpdate({ payload: formInput, ipId: editData._id })
          );
          if (response?.payload?.ResponseStatus == 1) {
            handleCloseModal();
          }
        } else {
          handleCloseModal();
        }
      } else {
        const response = await dispatch(ipCreate(formInput));
        if (response?.payload?.ResponseStatus == 1) {
          handleCloseModal();
        }
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  //..................... useffect
  useEffect(() => {
    if (editData) {
      const { ip, name } = editData;
      setFormInput({ ip, name });
    }
  }, [editData]);

  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 flex justify-end left-0 w-full h-screen bg-modal">
        <div className="pb-10 w-96 sm:w-2/3 md:w-1/2 h-full overflow-auto xl:w-1/3 p-4 bg-secondary shadow-xl">
          {/* Top */}
          <div className="flex justify-between items-center">
            <span className="text-color">
              {editData ? "Update" : "Add"} IPs
            </span>
            <MdClose
              className="text-xl cursor-pointer"
              onClick={() => {
                setFormInput({});
                handleCloseModal();
              }}
            />
          </div>

          {/*.............. Form Inputs */}
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

            {/*....................  Link */}
            <div className="grid gap-1">
              <label htmlFor="ip" className="text-sm">
                IP
              </label>
              <input
                autoComplete="off"
                id="ip"
                type="text"
                name="ip"
                placeholder="IP"
                value={formInput?.ip}
                onChange={handleChange}
                className="rounded py-1.5 px-2 outline-none border"
              />
              {validator.message("ip", formInput?.ip, "required|ip")}
              <ShowError data={errors.ip} />
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
