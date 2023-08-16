import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";
import type { UserResponse } from "../types/User.js";
const API_URL = "http://localhost:3000/api/profile/users"


export const load = async (event) => {
  const sessionId = event.cookies.get("sessionId");

  if (!sessionId) {
    throw redirect(301, "/sign-in");
  }
  
  if(! event.locals.authUser) throw redirect(302,'/sign-in')
  

    // if there is no sessionId, redirect to the sign-in page
  const res = await event.fetch(`${API_URL}?page=1`, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
    //credentials: 'include',
  }
  );

  // check the status
  if (res) {
    const usersRes = (await res.json()) as UserResponse

    return {
      usersRes,
      currentUser : event.locals.authUser,
    };
  }
};
