import { writable, type Writable } from "svelte/store";
import type { User } from "../types/User";
import type { Conversation } from "../types/Conversation";



export const user:Writable<User|undefined> = writable(undefined);

export const conversation:Writable<Conversation[]|undefined> = writable(undefined);