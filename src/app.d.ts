// See https://kit.svelte.dev/docs/types#app

import type { User } from "./types/User";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			authUser: User | undefined
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
