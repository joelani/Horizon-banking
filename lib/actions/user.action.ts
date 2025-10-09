"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { fi } from "zod/locales";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    //Mutation / Database / Make fetch
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession({
      email,
      password,
    });
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};
// export const signUp = async (userData: SignUpParams) => {
//   try {
//     //Create a user account
//     const { firstName, lastName, email, password } = userData;
//     const { account } = await createAdminClient();

//     const newUserAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       `${firstName} ${lastName}`
//     );

//     const session = await account.createEmailPasswordSession({
//       email,
//       password,
//     });

//     //little adjustment here
//     const cookieStore = await cookies(); // ✅ must await
//     cookieStore.set("appwrite-session", session.secret, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//       path: "/",
//     });
//     return parseStringify(newUserAccount);
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

export const signUp = async (userData: SignUpParams) => {
  console.log("SIGNUP FUNCTION CALLED ✅", userData);
  try {
    const { firstName, lastName, email, password } = userData;
    const { account } = await createAdminClient();

    console.log("Creating account...");

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    // console.log("Account created ✅", newUserAccount);

    // const session = await account.createEmailPasswordSession(email, password);
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });
    // console.log("Session created ✅", session);

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    console.log("Cookie set ✅");
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("❌ SIGNUP ERROR:", error);
    throw error; // rethrow so it’s visible in AuthForm
  }
};

// ... your initilization functions
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

//Logout function
export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error", error);
  }
};
