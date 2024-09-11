import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { register } = usePostStore();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!name || !email || !password) {
        toast.error("All fields are required");
        return;
      }

      await register(name, email, password);

      toast.success("Sign in successful");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex text-white flex-col mt-32 md:my-20  text-center items-center">
      <h1 className=" text-3xl font-extrabold text-black dark:text-white">
        Join kro today.
      </h1>
      <div className="shadow-md shadow-zinc-400 px-12 py-4 dark:bg-transparent bg-sky-50 text-black dark:text-white md:p-10 mt-5 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="my-8 w-52 md:w-72 rounded-full py-1.5 px-4 dark:placeholder:text-blue-300 bg-transparent border dark:border-white border-stone-500 "
          />
          <br />

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            className="mb-8 w-52 md:w-72 rounded-full py-1.5 px-4 dark:placeholder:text-blue-300 bg-transparent border dark:border-white border-stone-500 "
          />

          <br />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className="mb-8 w-52 md:w-72 rounded-full py-1.5 px-4 dark:placeholder:text-blue-300 bg-transparent border dark:border-white border-stone-500 "
          />
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Sign up
          </button>
        </form>

        <div className="mt-4">
          <h2 className="font-semibold">Already have an account?</h2>
          <button
            className="text-blue-500 border border-blue-600 px-4 py-2 rounded-full mt-3"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
