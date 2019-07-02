import React, { Fragment, useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

const CREATE_POST = gql`
  mutation($description: String!, $objectUrl: String!) {
    createPost(description: $description, objectUrl: $objectUrl) {
      id
      description
      objectUrl
    }
  }
`;

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [objectUrl, setobjectUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadVideo = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "oormjtcz");
    setLoading(true);
    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/malq/video/upload",
      {
        method: "POST",
        body: data
      }
    );

    const file = await res.json();

    setobjectUrl(file.secure_url);
    setLoading(false);
  };

  const handleSubmit = (e, createPost) => {
    e.preventDefault();
    createPost().then(data => {
      console.log(data);
    });
  };
  return (
    <Fragment>
      <h3>Create Post</h3>
      <Mutation mutation={CREATE_POST} variables={{ description, objectUrl }}>
        {createPost => {
          return (
            <form onSubmit={e => handleSubmit(e, createPost)}>
              <input type="file" name="file" onChange={uploadVideo} />
              <br />
              {loading ? (
                <h3>Loading ...</h3>
              ) : (
                <video src={objectUrl} style={{ width: "300px" }} controls />
              )}
              <br />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <br />
              <button type="submit">Publish</button>
            </form>
          );
        }}
      </Mutation>
    </Fragment>
  );
};

export default CreatePost;
