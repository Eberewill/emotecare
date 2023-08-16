import { redirect } from "@sveltejs/kit";


export function load({cookies}){
    
    cookies.set('sessionId', '',{maxAge: 0});
  
    throw redirect(302,'/sign-in');
}