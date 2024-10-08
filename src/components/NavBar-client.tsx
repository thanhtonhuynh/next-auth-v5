"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import UserButtonClient from "./UserButton-client";

export default function NavBarClient() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Next-Auth v5 Tutorial
        </Link>

        {user && <UserButtonClient user={user} />}
        {!user && session.status !== "loading" && <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Sign In</Button>;
}
