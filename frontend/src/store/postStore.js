import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  // setPosts: (posts) => set({ posts }),
  setPosts: (post) => set((state) => ({ posts: [...state.posts, post] })),

  createPost: async (newPost) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();

    set((state) => ({ posts: [...state.posts, data.data] }));
    return { success: true, message: "Post created successfully" };
  },

  fetchPost: async () => {
    const response = await fetch("/api/posts");
    const data = await response.json();
    set({ posts: data.posts });
  },
  deletePost: async (id) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success)
      return {
        success: false,
        message: data.message,
      };

    set((state) => ({ posts: state.posts.filter((post) => post._id !== id) }));
    return { success: true, message: data.message };
  },

  updatePost: async (pid, updatedPost) => {
    const response = await fetch(`/api/posts/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    const data = await response.json();

    if (!data.success)
      return {
        success: false,
        message: data.message,
      };

    set((state) => ({
      posts: state.posts.map((post) => (post._id === pid ? data.post : post)),
    }));
  },

  login: async (email, password) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    const token = data.token;

    set(() => ({
      token,
    }));

    localStorage.setItem("token", token);
  },

  register: async (name, email, password) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    const token = data.token;

    set(() => ({
      token,
    }));

    localStorage.setItem("token", token);
  },
}));
