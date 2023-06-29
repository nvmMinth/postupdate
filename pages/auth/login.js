import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  //SIGN IN WITH GG
  const GoogleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      route.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("Sign in needed");
    }
  }, [user]);

  return (
    <div className="drop-shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium">Join today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="bg-gray-700 text-white text-base w-full font-medium rounded-md gap-2 p-2 flex items-center"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
