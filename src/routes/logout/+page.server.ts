import { redirect } from "@sveltejs/kit";
import { session } from "../../stores/session.js";


export function load({cookies}){
    
    cookies.set('sessionId', '',{maxAge: 0});
  
    throw redirect(302,'/sign-in');
}