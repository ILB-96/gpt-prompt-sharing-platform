"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log(session?.user.id);
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const postsData = await res.json();
      console.log(postsData);
      setPosts(postsData);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  const handleEdit = () => {};

  const handleDelete = async () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page! Here you can view your prompts, edit your profile, and more!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
