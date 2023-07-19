"user client";
import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="grid grid-cols-3 grid-flow-row auto-rows-max content-center gap-5">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const searchText = useRef("");
  const [totalPosts, setTotalPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const fuse = new Fuse(totalPosts, {
    keys: ["tag", "prompt"],
  });

  const handleSearchChange = () => {
    const text = searchText.current.value;
    let result = fuse.search(text);
    result = result.map((post) => post.item);
    if (text === "") {
      result = totalPosts;
    }
    setPosts(result);
  };
  const handleTagClick = (tag) => {
    let result = fuse.search({ tag: tag });
    result = result.map((post) => post.item);
    searchText.current.value = tag;
    setPosts(result);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
      setTotalPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className=" relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a prompt"
          ref={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer transition duration-300 ease-in-out focus:translate-y-1 focus:scale-105"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
