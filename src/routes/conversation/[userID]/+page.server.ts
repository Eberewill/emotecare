
import { redirect } from '@sveltejs/kit';
import type { Conversation, conversationResponse } from '../../../types/Conversation.js';
import { BASE_URI } from '$lib/setup.js';


export const load = async (event) => {
    const sessionId = event.cookies.get("sessionId");

    if (!sessionId) {
        throw redirect(301, "/sign-in");
    }

    
    if(! event.locals.authUser) throw redirect(302,'/sign-in')
  
   
    const requestedUrl = event.params.userID;

    if( event.locals.authUser.id == Number(requestedUrl)) throw redirect(302,'/')
    

    const res = await fetch(`${BASE_URI}/conversations?partner_id=${requestedUrl}&page=1&page_size=20`, {
        headers: {
            Authorization: `Bearer ${sessionId}`,
        },
        //credentials: 'include',
    });




    if (res) {
     const   response = await res.json() as conversationResponse
        return {
          requestedUrl: requestedUrl,
          currentUser : event.locals.authUser,
          conversations: response 
      };

    }

   
}
