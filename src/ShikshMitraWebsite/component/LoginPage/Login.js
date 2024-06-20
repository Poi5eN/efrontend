import React, { useEffect, useState } from "react";
import "./LoginCss.css";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import Dropdown from "./Dropdown";
import Cookies from "js-cookie";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoading] = useState(false);

  const [isClosed, setIsClosed] = useState(true);
  const [formdata, setformdata] = useState({
    Username: "",
    Password: "",
    Role: "admin",
  });

  const { setisLoggedIn } = useStateContext();
  const Navigate = useNavigate();

  function onclickHandler(event) {
    setformdata((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }
  function submitHandler(e) {
    setTimeout(() => {
      setIsClosed(true);
    }, 1000);
    e.preventDefault();
    setLoading(true);

    const loginobj = {
      email: formdata.Username,
      password: formdata.Password,
      role: formdata.Role,
    };
    sessionStorage.setItem("userRole", formdata.Role);
    axios
      .post("https://ebackend-iasf.onrender.com/api/v1/login", loginobj)
      .then((response) => {
        setisLoggedIn(formdata.Role);
        Cookies.set("token", response?.data?.token, { expires: 7 });

        const fullName = response.data.user.fullName;
        const image = response.data.user.image.url;
        const email = response.data.user.email;
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("image", image);
        localStorage.setItem("email", email);
        localStorage.setItem("response", JSON.stringify(response.data.user));
        const token = response.data.token;
        document.cookie = `token=${token}; path=/; max-age=3600`;
        showSuccessToast("Login successful!!!");
        Navigate(`/${formdata.Role}`);
      })
      .catch((error) => {
        setLoading(false); // Stop the loading spinner
        showErrorToast("Login failed. Please check your credentials.");
        setIsClosed(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const showErrorToast = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the notification after 3 seconds
      style: { marginTop: "50px" }, // Add margin-top
    });
  };
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      style: { marginTop: "50px" },
    });
  };

  const handleClick = () => {
    setIsClosed(!isClosed);
  };
  useEffect(() => {
    setTimeout(() => {
      setIsClosed(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading && <Spinner />}
      {
        <div className="bg-[#1f2937] h-screen flex justify-center items-center">
          <div className="laptop js-laptop ">
            <div className="laptop-top">
              <div className={`${isClosed ? "laptop--closed" : ""}`}>
                <div className="laptop__screen">
                  <div className="py-5 md:px-10 px-5 ">
                    <form
                      onSubmit={submitHandler}
                      className="space-y-2 md:px-20"
                    >
                      <Dropdown formdata={formdata} setformdata={setformdata} />

                      <input
                        className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                        required
                        type="text"
                        name="Username"
                        id="Username"
                        placeholder="User Name"
                        value={formdata.Username}
                        onChange={onclickHandler}
                      />

                      <input
                        className="rounded-md  bg-[#000102a1] text-white border-2 border-white w-full py-2 outline-none  px-3"
                        required
                        placeholder="Password"
                        type="password"
                        name="Password"
                        id="Password"
                        value={formdata.Password}
                        onChange={onclickHandler}
                      />

                      <input
                        type="submit"
                        className="rounded-md w-full py-2 text-white cursor-pointer outline-none border-none px-3 bg-cyan-700"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="laptop__base cursor-pointer"
              onClick={handleClick}
            ></div>
          </div>
        </div>
      }
    </>
  );
}

export default Login;
