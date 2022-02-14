import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Post() {
  const { id, userId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    async function getData() {
      const response1 = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data1 = await response1.json();
      setPost(data1);

      setLoading(false);
    }

    getData();
  }, [id]);

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          navigate(`/posts/${userId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = async (id) => {
    setLoading(true);

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    let data = await response.json();
    // data = data.filter((comment) => comment.postId === parseInt(id));
    setComments(data);
    setLoading(false);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Box component="div" sx={{ p: 2, border: "1px dashed grey" }}>
        <h1>{post.title}</h1>
        <h4>{post.body}</h4>
        <button
          onClick={() => {
            getComments(post.id);
            setShowComments(!showComments);
          }}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <button
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete
        </button>
      </Box>

      <Divider />
      {showComments && (
        <div>
          <h1>Comments</h1>
          <List>
            {comments.map((comment) => {
              return (
                <div key={comment.id}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={comment.body} />
                    </ListItemButton>
                  </ListItem>
                </div>
              );
            })}
          </List>
        </div>
      )}
    </div>
  );
}

export default Post;