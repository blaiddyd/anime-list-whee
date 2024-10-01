import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function postHandler(req: Request) {
  const { username, jobTitle } = await req.json();

  if (username && jobTitle) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = JSON.stringify({ username, jobTitle, expiresAt });
  
    cookies().delete("session");

    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json({ message: "Great success" }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Invalid data" }, { status: 401 });
  }
}

async function getHandler() {
  const session = cookies().get("session");

  return NextResponse.json({ session }, { status: 200 });
}

export { postHandler as POST, getHandler as GET };
