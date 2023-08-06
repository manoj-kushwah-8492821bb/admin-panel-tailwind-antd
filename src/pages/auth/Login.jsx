import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../toolkit/action/authAction";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import ButtonLoader from "../../common/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import ShowError from "../../common/ShowError";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState({});
  const { loading } = useSelector((state) => state.authReducer);
  const validator = new SimpleReactValidator({ className: "text-danger" });

  // handleChange
  const handleChange = (event) => {
    setErrors({ ...errors, [event.target.name]: "" });
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  // handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validator.allValid()) {
      const response = await dispatch(authLogin(formInput));
      if (response?.payload?.Status) {
        navigate("/dashboard");
        window.location.reload();
      }
    } else {
      validator.showMessages();
      setErrors(validator.errorMessages);
    }
  };

  return (
    <div className="flex w-full h-screen mx-auto overflow-hidden shadow-lg  ">
      <div
        className="hidden bg-cover lg:block lg:w-2/3"
        style={{
          backgroundImage: `url(
              "https://images.unsplash.com/photo-1498736297812-3a08021f206f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=879&q=80"
            )`,
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto itemc w-full px-6 py-8 flex flex-col justify-center md:px-8 lg:w-1/3"
      >
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-10 sm:h-12" src={Logo} alt="" />
        </div>

        <p className="mt-3 text-xl text-center  ">Welcome back</p>

        {/* Email */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium  " htmlFor="email">
            Email Address
          </label>
          <input
            autoComplete="off"
            id="email"
            className="block w-full px-4 py-2 bg-transparent border-gray-700 outline-none  border rounded-md"
            type="text"
            value={formInput?.email}
            name="email"
            onChange={handleChange}
          />
          {validator.message("email", formInput?.email, "required|email")}
          <ShowError data={errors.email} />
        </div>

        {/* Password */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium  "
              htmlFor="password"
            >
              Password
            </label>
          </div>

          <div className="flex gap-2 border-gray-700 border rounded-md px-4 items-center">
            <input
              autoComplete="off"
              id="password"
              className="block w-full  py-2 outline-none"
              type={show ? "text" : "password"}
              value={formInput?.password}
              name="password"
              onChange={handleChange}
            />
            <span
              onClick={() => setShow(!show)}
              className="text-2xl cursor-pointer text-color"
            >
              {show ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {validator.message("password", formInput?.password, "required")}
          <ShowError data={errors.password} />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize  bg-color duration-300 flex items-center justify-center transform  rounded-md bg-button focus:outline-none "
          >
            {loading ? <ButtonLoader /> : " Sign In"}
          </button>
        </div>

        {/* Label */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b  md:w-1/4"></span>

          <div className="text-xs text-color uppercase ">
            {" "}
            <span className="text-red-500 pr-1">❤</span> KanhaPe
          </div>

          <span className="w-1/5 border-b  md:w-1/4"></span>
        </div>
      </form>
    </div>
  );
};

export default Login;
