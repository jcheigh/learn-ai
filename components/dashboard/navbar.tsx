import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

const Navbar = () => {
  return (
    <div className="p-4 border-b w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image 
          src="/logo.svg" 
          alt="Logo" 
          width={40} 
          height={40} 
        />
        <span className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">logoipsum</span>
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName/>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
