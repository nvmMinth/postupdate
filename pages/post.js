import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState({ description: "" });
  console.log(post);
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  console.log(route);
  const routeQuery = route.query;
  /// SUBMIT POST
  const submitPost = async (e) => {
    e.preventDefault();
    /// Check post condition
    if (!post.description) {
      toast.error("Can not submit empty post", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("Length exceeds the limit", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    /// Edit current post or Create new post
    // edit
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const editedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, editedPost);
      return route.push("/");
    } else {
      // create
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      toast.success("Submit post sucessfully 👌", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };
  /// CHECK USER (IF LOGIN/ IF EDIT USER'S POST)
  const checkUser = () => {
    if (loading) return;
    if (!user) {
      route.push("/auth/login");
    }
    if (routeQuery.id) {
      setPost({ description: routeQuery.description, id: routeQuery.id });
    }
  };
  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 drop-shadow-lg rounded-lg max-w-md p-12 mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full rounded-lg text-white p-2"
          ></textarea>
          <p
            className={`${post.description.length > 300 ? "text-red-600" : ""}`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 p-2 rounded-lg text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
