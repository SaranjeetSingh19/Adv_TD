import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { usePostStore } from "../store/postStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = usePostStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        toast.error("All fields are required");
        return;
      }

      await login(email, password);

      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex text-black dark:text-white flex-col mt-40 md:my-20 text-center items-center">
      <h1 className="text-3xl  font-extrabold text-black dark:text-white">
        {"Let's"} go.
      </h1>
      <div className="shadow-md shadow-zinc-400 px-12 py-4 md:p-10 mt-5 rounded-2xl dark:bg-transparent bg-sky-50">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            className="my-8 w-52 md:w-72 rounded-full py-1.5 px-4 dark:placeholder:text-blue-300 bg-transparent border dark:border-white  border-stone-600  "
          />

          <br />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className="mb-8 w-52 md:w-72 rounded-full py-1.5 px-4 dark:placeholder:text-blue-300 bg-transparent border border-stone-600 dark:border-white "
          />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <h2 className="font-semibold">{"Don't"} have an account?</h2>
          <button
            className="text-blue-500 border border-blue-600 px-4 py-2 rounded-full mt-3"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
