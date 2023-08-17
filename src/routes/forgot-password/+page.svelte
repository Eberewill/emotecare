<script>
  import { goto } from "$app/navigation";
  import { BASE_URI } from "$lib/setup";
  import axios from "axios";
  import toast, { Toaster } from "svelte-french-toast";


    let email = '';
    
    let isLoading = false;
    let showDelivered = false
    
// @ts-ignore
async function handleSubmit(event) {
  event.preventDefault();
  isLoading = true;
  try {
  const response = await axios.post(`${BASE_URI}/password/reset-request`, {
    email,
  });

  if (response.data.message === "Password reset email sent" ) {

    
    toast.success(`Success ${response.data.message}`)
    showDelivered = true

  } else {
   // console.log("res", response)
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
{#if showDelivered}
<section>
  <div class="rounded-md bg-green-50 p-4 mt-20">
    <div class="flex">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-green-800">Reset Password Email Sent</h3>
        <div class="mt-2 text-sm text-green-700">
          <p>A reset password email has been sent to {email}.<br>Kindly check your spam or promotional folders for the reset link.</p>
        </div>
        <div class="mt-4">
          <div class="-mx-2 -my-1.5 flex">
            <button on:click={()=> showDelivered = false} type="button" class="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">Did not get mail? Resend</button>
             </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/if}
{#if !showDelivered}
    <div   class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
           <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">recover your account</h2>
        </div>
      
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" on:submit={handleSubmit}>    
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" bind:value={email} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                Reset password
              {/if}
            </button>
                 </div>
          </form>
          <p class="mt-10 text-center text-sm text-gray-500">
            Or
            <a href="/sign-up" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</a>
          </p>
        </div>
      </div>
    {/if}