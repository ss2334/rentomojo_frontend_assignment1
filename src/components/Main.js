import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Post from "./Post";
import Posts from "./Posts";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/post/:id&:userId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default Main;