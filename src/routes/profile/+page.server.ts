import { redirect } from "@sveltejs/kit";
import { goto } from "$app/navigation";
import { BASE_URI } from "$lib/setup.js";


export const load = async (event) => {
  const sessionId = event.cookies.get("sessionId");

  if (!sessionId) {
    throw redirect(301, "/sign-in");
  }
  
    // if there is no sessionId, redirect to the sign-in page
  const res = await event.fetch(`${BASE_URI}/auth/validate`, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
    //credentials: 'include',
  }
  );

  // check the status
  if (res) {
    const user = (await res.json()) as {
      id: number;
      name: string;
      email: string;
      session: string
    };

    user.session = sessionId
    return {
      props: {
        user 

      },
    };
  }
};
