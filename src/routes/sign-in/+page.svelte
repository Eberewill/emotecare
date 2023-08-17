<script>
	import toast, { Toaster } from 'svelte-french-toast';
  import { goto } from '$app/navigation';
  import axios from 'axios'
  import { BASE_URI } from '$lib/setup';


let email = '';
let password = '';
let isLoading = false;

/**
   * @param {string} name
   * @param {string} value
   * @param {number} days
   */
 export function setCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

// @ts-ignore
async function handleSubmit(event) {
  event.preventDefault();
  isLoading = true;
  try {
  const response = await axios.post(`${BASE_URI}/auth/login`, {
    email,
    password,
  });

  if (response.data.message === "Success") {

    let bearerToken = response.data.token
    const token = bearerToken?.split("Bearer ")[1] || "";
    setCookie("sessionId", token, 2); 
    toast.success(`Login ${response.data.message}`)
    goto("/");
  } else {
    console.log("res", response)
    toast.error(`Error: ${response.data.message}`)
  }
} catch (error) {
  console.error("Error submitting form:", error);
  // @ts-ignore
  toast.error(`${error.response.status} Error: ${error.response.data.message}`)
}

  isLoading = false;
}



</script>

<Toaster />
<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      class="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    />
    <h2
      class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
    >
      Sign In to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form on:submit={handleSubmit} class="space-y-6">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            bind:value={email}
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="text-sm">
            <a
              href="/forgot-password"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Forgot password?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            bind:value={password}
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {#if isLoading}
            <svg
              class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          {:else}
            Sign in
          {/if}
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a
        href="/sign-up"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >Sign Up</a
      >
    </p>
  </div>
</div>
