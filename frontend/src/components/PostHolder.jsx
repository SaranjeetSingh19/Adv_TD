import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { usePostStore } from "../store/postStore";

import toast from "react-hot-toast";
import { useState } from "react";

const PostHolder = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [updatedPost, setUpdatedPost] = useState(post);

  function formatCreatedAt(createdAt) {
    const date = new Date(createdAt);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",

      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate.replace(/GMT.+/, "");
  }

  const { createdAt, title, content } = post;

  const finalDate = formatCreatedAt(createdAt);

  const { deletePost, updatePost } = usePostStore();

  const deletePostHandler = async (id) => {
    const { success, message } = await deletePost(id);

    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const updatePostHandler = async (pid, updatedPost) => {
    await updatePost(pid, updatedPost);

    toast.success("Post updated successfully");

    setIsOpen(false);
  };

  return (
    <div className="">
      <div className="w-4/5  md:w-full text-center ml-4 md:ml-6">
        <div className="text-start bg-white dark:bg-zinc-900 dark:border-0 border border-gray-300 text-white mb-8 rounded-3xl md:rounded-xl ">
          <h2 className="text-blue-700 text-lg md:text-2xl font-bold px-4 pt-4">
            {title}
          </h2>
          <h3 className="text-base md:text-lg p-4 dark:text-white text-sky-800 font-semibold">
            {content}
          </h3>
          <div className="flex items-center gap-5 md:gap-8 text-base md:text-xl ml-4">
            <button
              className="text-blue-800 bg-blue-200 p-1.5 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <MdOutlineAddToPhotos />
            </button>

            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-75 z-10"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col dark:bg-neutral-900 bg-zinc-200 text-black rounded-lg p-4 w-3/4 md:w-1/3  md:px-16  md:py-10 px-6 py-4">
                  <div className="flex flex-col gap-8">
                    <h2 className="dark:text-white text-blue-700 text-2xl  md:text-3xl font-bold">
                      Update Post
                    </h2>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      value={updatedPost.title}
                      onChange={(e) =>
                        setUpdatedPost({
                          ...updatedPost,
                          title: e.target.value,
                        })
                      }
                      className="rounded-lg w-full border outline-none  border-gray-500 bg-transparent text-stone-900 dark:text-white px-3 py-1.5"
                    />
                    <textarea
                      type="text"
                      name="content"
                      value={updatedPost.content}
                      placeholder="Enter Content"
                      onChange={(e) =>
                        setUpdatedPost({
                          ...updatedPost,
                          content: e.target.value,
                        })
                      }
                      className="rounded-lg w-full border outline-none  border-gray-500 bg-transparent text-stone-900 dark:text-white px-3 py-1.5"
                    />
                  </div>

                  <div className="flex gap-6 mt-6">
                    <button
                      onClick={() => updatePostHandler(post._id, updatedPost)}
                      className="text-white bg-blue-500 hover:bg-blue-700 md:text-lg text-base  font-semibold py-1 md:px-3 px-2 rounded-lg"
                    >
                      Update
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-700 md:text-lg text-base text-white font-semibold py-1 md:px-3 px-2 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => deletePostHandler(post._id)}
              className="text-red-800 bg-red-400 p-1.5 rounded-full"
            >
              <MdDelete />
            </button>
          </div>
          <h5 className="text-sm p-4 font-semibold dark:text-zinc-500 text-zinc-900">{finalDate}</h5>
        </div>
      </div>
    </div>
  );
};

export default PostHolder;
