"use client"
import { useClerk } from "@clerk/nextjs";
import { CrownIcon } from "lucide-react";


export default function AccountButton({ isPremiumUser }) {
  const { signOut, user } = useClerk(); // Access Clerk's user and authentication methods

  const handleAccountClick = () => {
    if (user) {
      // Redirect to the user's account page or dashboard
      window.location.href = "/account"; // Replace with your account page URL
    } else {
      // Redirect to the sign-in page if user is not signed in
      window.location.href = "/sign-in"; // Replace with your sign-in page URL
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {isPremiumUser && (
        <CrownIcon className="ml-2 text-yellow-600 text-base" />
      )}
      <button
        className="px-8 py-3 bg-black hover:bg-accent duration-200 ease-in-out text-white text-base font-bold rounded-full"
        onClick={handleAccountClick}
      >
        My Account
      </button>
      <button
        className="px-8 py-3 bg-red-500 hover:bg-red-600 duration-200 ease-in-out text-white text-base font-bold rounded-full"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
}
