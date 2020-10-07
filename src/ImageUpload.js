import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

export const ImageUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage("");
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imageUploadProgress" value={progress} max="100" />
      <input
        className="imageUpload__caption"
        type="text"
        placeholder="enter a caption ..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" className="imageUpload__file" onChange={handleChange} />
      <Button disabled={!caption || !image}  color="primary" onClick={handleUpload}>Upload</Button>
    </div>
  );
};
