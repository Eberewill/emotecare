import { redirect } from "@sveltejs/kit";
const API_URL = "http://localhost:3000/api/auth/validate"


export const load = async (event) => {
  
    const sessionId = event.cookies.get("sessionId");

    console.log("SSSSESSION", sessionId)
  if (!sessionId) {
    throw redirect(301, "/sign-in");
  }
  
    // if there is no sessionId, redirect to the sign-in page
  const res = await event.fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
    credentials: 'include',
  }
  );

  // check the status
  if (res) {
    const user = (await res.json()) as {
      id: number;
      name: string;
      email: string;
    };


    return {
      props: {
         user,
      },
    };
  }
};
