import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { toast } from "react-toastify";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";

export default function Detail() {
  const route = useRouter();
  const routeQuery = route.query;
  console.log(route);
  /// state for comments
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  /// SUBMIT MESSAGE
  const submitMessage = async () => {
    if (!auth.currentUser) return route.push("/auth/login");
    if (!comment) {
      toast.error("Can't submit emty message ⚠️", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    const docRef = doc(db, "posts", routeQuery.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        comment,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setComment("");
  };

  /// GET COMMENTS
  const getComments = async () => {
    const docRef = doc(db, "posts", routeQuery.id);
    const unsubsribe = onSnapshot(docRef, (snapshot) => {
      setAllComments(snapshot.data().comments);
    });
    return unsubsribe;
  };
  useEffect(() => {
    if (!route.isReady) return;
    getComments();
  }, [route.isReady, getComments]);

  return (
    <div>
      <Message {...routeQuery}>
        <div className="my-4">
          <div className="flex">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a message..."
              className="bg-gray-800 p-2 text-gray-50 outline-none w-full text-sm"
            />
            <button
              onClick={submitMessage}
              className="bg-cyan-500 text-white py-2 px-4"
            >
              Send
            </button>
          </div>
          <div className="py-6">
            <h2 className="font-bold">Comments</h2>

            {allComments?.map((comment) => (
              <div
                className="border-b-2 p-4 bg-white my-4"
                key={comment.username}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={comment.avatar}
                      alt="avatar"
                      className="rounded-full w-10"
                    />
                    <h2>{comment.username}</h2>
                  </div>
                  <div>
                    <small>
                      {new Date(
                        comment.time.seconds * 1000 +
                          comment.time.nanoseconds / 1000
                      ).toLocaleString()}
                    </small>
                  </div>
                </div>
                <div className="pt-4">
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Message>
    </div>
  );
}
