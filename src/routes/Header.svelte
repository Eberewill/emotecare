<script>
// @ts-nocheck

  import FirstLetterImage from "./conversation/FirstLetterImage.svelte";
  import { session } from '../stores/session'
  import { goto } from "$app/navigation";

  function handleLogout  () {
	session.logout()
	goto("/logout")
  }

</script>

<nav class="bg-blue-900 p-2">
  <div class="container mx-auto flex justify-between items-center">
    {#if $session.user?.name}
      <FirstLetterImage word={$session.user?.name} />
    {/if}
    <ul class="flex space-x-4">
      {#if !$session.user?.name}
        <li>
          <a href="/sign-in" class="text-white hover:underline">Sign-In</a>
        </li>
      {/if}
      {#if $session.user?.name}
        <li>
          <div  class="text-white hover:underline">
            <button
			  on:click={handleLogout}
              class="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded shadow flex items-center space-x-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </li>
      {/if}
    </ul>
  </div>
</nav>
