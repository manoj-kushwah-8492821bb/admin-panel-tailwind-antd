import Layout from "../../layouts";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSetting, updateSetting } from "../../toolkit/action/authAction";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdCloudUpload } from "react-icons/md";
import ButtonLoader from "../../common/ButtonLoader";
import { IMAGE_URL } from "../../utils/endpoints";

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [preview, setPreview] = useState();
  const { settingData, loading } = useSelector((state) => state.authReducer);
  const [formInput, setFormInput] = useState({});

  // handle change
  const handleChange = (event) => {
    const { type, name, value } = event.target;
    setIsEdit(true);
    if (type === "file") {
      setPreview(URL.createObjectURL(event.target.files[0]));
      setFormInput({ ...formInput, [name]: event.target.files[0] });
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  // handle submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEdit) {
      const payload = new FormData();
      Object.keys(formInput).map((item) => {
        return payload.append(item, formInput[item]);
      });
      dispatch(
        updateSetting({
          payload,
          callback: () => {
            setIsEdit(false);
            navigate("/dashboard");
          },
        })
      );
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    dispatch(getSetting((e) => setFormInput(e)));
  }, [dispatch]);
  return (
    <>
      <div className="w-full relative table-container bg-white rounded shadow">
        {/* Banner */}
        <section className="relative rounded-t-lg block">
          <span className="w-full sm:p-4 p-2.5 h-full flex flex-col justify-between rounded-t-lg absolute">
            {/* Back Button */}
            <div
              onClick={() => navigate("/dashboard")}
              className="  sm:text-lg  gap-2 sm:gap-2.5 items-center flex "
            >
              <IoIosArrowBack className="bg-button rounded text-gray-900 p-1 sm:p-1.5  cursor-pointer text-2xl sm:text-3xl" />
              App Setting
            </div>
          </span>
        </section>

        {/* Content */}
        <div className="flex relative flex-col  justify-center p-5 pt-12 rounded-b-xl">
          <img
            src={preview ? preview : `${IMAGE_URL}${settingData?.logo}`}
            alt={settingData?.name}
            className="object-cover h-20 sm:w-32 sm:h-32 bg-blue-500 p-0.5 border-color border-2 -top-10  mx-auto rounded-full aspect-square"
          />

          {/* Form */}
          <form onSubmit={handleSubmit} className="my-7 ">
            <section className="max-w-md grid gap-4 mx-auto">
              {/* App Logo */}
              <div className="grid gap-2 text-sm">
                <label
                  htmlFor="images"
                  className="rounded p-2  flex
                   gap-3 outline-none border-2 items-center border-dashed border-color"
                >
                  <MdCloudUpload className="text-xl cursor-pointer" />{" "}
                  <span className="text-gray-400 text-sm">
                    {formInput?.logo?.name
                      ? formInput?.logo?.name
                      : " Upload Image"}
                  </span>
                </label>
                <input
                  autoComplete="off"
                  id="images"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="rounded py-1.5 px-2  hidden outline-none border border-color"
                />
              </div>

              {/* App Name */}
              <div className="grid gap-1 text-sm">
                <label htmlFor="name">App Name</label>
                <input
                  autoComplete="off"
                  id="name"
                  type="text"
                  name="name"
                  value={formInput?.name}
                  onChange={handleChange}
                  className="rounded p-2 px-3 outline-none border-color border"
                />
              </div>

              {/* Service Charge */}
              <div className="grid gap-1 text-sm">
                <label htmlFor="serviceCharge">Service Charge</label>
                <input
                  autoComplete="off"
                  id="serviceCharge"
                  type="text"
                  name="serviceCharge"
                  value={formInput?.serviceCharge}
                  onChange={handleChange}
                  className="rounded p-2 px-3 outline-none border-color border"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white justify-center flex items-center cursor-pointer tracking-wider py-2 px-4 rounded "
              >
                {loading ? <ButtonLoader /> : "Update"}
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Layout(Setting);
