import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface User {
  id : number,
  name: string,
  email: string
}

interface Session {
  authenticated: boolean;
  user: User | null;
}

interface SessionStore extends Writable<Session> {
  login: (user: User) => void;
  logout: () => void;
}

const createSessionStore = (): SessionStore => {
    const { subscribe, set, update } = writable<Session>({
      authenticated: false,
      user: null
    });
  
    return {
      subscribe,
      set,
      update,
      login: (user: User) => update(session => ({ ...session, authenticated: true, user })),
      logout: () => set({ authenticated: false, user: null })
    };
  };

export const session = createSessionStore();
