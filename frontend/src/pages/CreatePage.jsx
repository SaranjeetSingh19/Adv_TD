import { useState } from "react";
import { usePostStore } from "../store/postStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const { createPost } = usePostStore();

  const handleButtonClick = async () => {
    const { success, message } = await createPost(inputValues);

    if (!success) {
      toast.error("This didn't work.");
    }

    if (success) {
      toast.success(message);
    }

    setInputValues({ title: "", content: "" });
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="md:text-4xl text-2xl text-blue-700 my-32 md:my-16 font-bold mb-4 ">
        Create Post
      </h1>

      <div className="md:w-2/5 w-4/5">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={inputValues.title}
            onChange={handleInputChange}
            placeholder="Enter title"
          className="placeholder:text-blue-400 font-bold placeholder:font-semibold dark:bg-transparent dark:border dark:text-white dark:placeholder: dark:border-zinc-400 bg-blue-200 border-gray-700 text-blue-950 outline-none rounded-lg p-2.5 px-4  w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="content"
            value={inputValues.content}
            onChange={handleInputChange}
            placeholder="Enter content"
            className="placeholder:text-blue-400 font-bold placeholder:font-semibold dark:bg-transparent dark:border dark:text-white dark:placeholder: dark:border-zinc-400 bg-blue-200 border-gray-700 text-blue-950 outline-none rounded-lg p-2.5 px-4  w-full"
          />
        </div>
      </div>
      <button
        onClick={handleButtonClick}
        className="bg-black font-bold dark:bg-white dark:text-black text-white border-none outline-none hover:bg-zinc-800 rounded-lg w-4/5 md:w-2/5 p-2.5 px-4"
      >
        Add Post
      </button>
    </div>
  );
};

export default CreatePage;
