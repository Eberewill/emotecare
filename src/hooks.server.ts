import { BASE_URI } from '$lib/setup';

export async function handle({ event, resolve }) {
    const authToken = event.cookies.get("sessionId");
    try{
        if(!authToken) event.locals.authUser = undefined;
       // const claims = jwt.verify(authToken,SECRET_INGREDIENT);
       // if(!claims) event.locals.authedUser = undefined;


        if(authToken){

          const res = await event.fetch(`${BASE_URI}/auth/validate`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: 'include',
          }
          ).then((ress)=>ress.json())

          if(res.user){
            event.locals.authUser = res.user
          }
        }
    }
    finally{
        const response = await resolve(event);
        return response;
    }

  }
  