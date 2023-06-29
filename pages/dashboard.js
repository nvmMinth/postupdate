import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { AiFillEdit } from "react-icons/ai"
import { IoMdTrash } from "react-icons/io"
import Link from "next/link";
import Message from "../components/Message"

export default function Dashboard() {
    const [user, loading] = useAuthState(auth)
    const route = useRouter()
    const [yourPosts, setYourPosts] = useState([])
    console.log(yourPosts);
    const getDashboard = async () => {
        if (loading) return
        if (!user) {
            route.push("/auth/login")
        }
        const collectionRef = collection(db, "posts")
        const q = query(collectionRef, where("user", "==", user.uid))
        const unsubscribe = onSnapshot(q, snapshot => {
            setYourPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        return unsubscribe
    }
    useEffect(() => {
        getDashboard()
    }, [user, loading, getDashboard])

    // Delete post
    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id)
        await deleteDoc(docRef)
    }
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Your post</h1>
            <div>
                {
                    yourPosts.map(post => {
                        return <Message {...post} key={post.id}>
                            <div className="flex gap-4 mt-4 justify-end">
                                <button onClick={() => deletePost(post.id)} className="flex items-center gap-1 text-sm text-red-700">
                                    <IoMdTrash className="text-xl" /> Delete
                                </button>
                                <Link href={{ pathname: "/post", query: post }}>
                                    <button className="flex  items-center gap-1 text-sm text-blue-700">
                                        <AiFillEdit className="text-xl" /> Edit
                                    </button>
                                </Link>
                            </div>
                        </Message>
                    })
                }
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 my-6" onClick={() => auth.signOut()}>Sign out</button>
        </div>
    )
} 