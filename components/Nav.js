import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
    const [user, loading] = useAuthState(auth)
    console.log(user);
    return (
        <nav className="flex justify-between items-center py-10">
            <Link href="/">
                <button className="text-lg font-medium">Creative Minds</button>
            </Link>
            <ul className="gap-10 flex items-center">
                {!user && (
                    <Link href={"/auth/login"}>
                        <a className="text-sm py-2 px-4 font-medium bg-cyan-500 text-white rounded-lg">Join now</a>
                    </Link>
                )}
                {user && (
                    <div className="flex items-center gap-6">
                        <Link href={"/post"}>
                            <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-md text-sm">Post</button>
                        </Link>
                        <Link href={"/dashboard"}>
                            <img src={user.photoURL} alt="avatar" className="rounded-full w-10 cursor-pointer" />
                        </Link>
                    </div>
                )}
            </ul>
        </nav>
    )
}