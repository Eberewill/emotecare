//import { API_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export const load = async (event : any) => {
    // get the sessionId from the cookie
    const sessionId = event.cookies.get("sessionId");
  
    // if there is a sessionId, redirect to the user page
    if (sessionId) {
      throw redirect(301, "/");
    }
  };
  