import { useEffect } from "react";
import { Link } from "react-router-dom";

import { usePostStore } from "../store/postStore";
import PostHolder from "../components/PostHolder";

const HomePage = () => {
  const { fetchPost, posts } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);


  return (
    <div className="md:pr-20 md:px-36 gap-4 md:py-20 px-4 pt-8">
      {posts.length === 0 ? 
      
      <div className="flex md:justify-center md:mt-28 my-36 text-center">
      <div className="md:text-3xl text-xl text-red-600 font-semibold ">
        No Posts Found! {"     "}
        <span className="hover:underline  text-blue-400">
          {"  "}
          <Link to={"/create"}>Create your first Post </Link>😉✌️
        </span>
      </div>
    </div> :

      
      posts && posts.map((post) => (
         <PostHolder key={post._id} post={post} />
       )) }

     
    </div>
  );
};

export default HomePage;
