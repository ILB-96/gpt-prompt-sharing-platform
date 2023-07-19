"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const ProfileView = () => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const postsData = await res.json();

      setPosts(postsData);
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <Profile
      name={posts[0]?.creator?.username || "User"}
      desc="Personal profile page! 
      Here you can view his prompts and activities"
      data={posts}
    />
  );
};

export default ProfileView;
