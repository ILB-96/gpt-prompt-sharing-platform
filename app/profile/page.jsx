"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import logger, { log } from "@utils/logger";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const postsData = await res.json();

      setPosts(postsData);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/edit-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (!hasConfirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
      } else {
        logger.error(res);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page! 
      Here you can view your prompts, 
      edit your profile, and more!"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
