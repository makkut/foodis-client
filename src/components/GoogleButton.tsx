import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  return (
    <button
      onClick={() => signIn("google", { callbackUrl })}
      className="text-white bg-red-600 hover:bg-red-500 px-[70px] py-[9px] mt-3 duration-500 transform rounded-[5px] font-bold text-base"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleButton;
