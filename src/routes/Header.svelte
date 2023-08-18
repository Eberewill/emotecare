<script lang="ts">
  // @ts-nocheck

  import FirstLetterImage from "./conversation/FirstLetterImage.svelte";
  import { session } from "../stores/session";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { extractMessage } from "../utils";
  import { formatRelativeTime, truncateText } from "$lib/utils";
  import { WS_ENDPOINT } from "$lib/setup";
  import toast, { Toaster } from "svelte-french-toast";

  let socket: WebSocket;

  function handleLogout() {
    session.logout();
    goto("/logout");
  }

  //Notification
  let isModalOpen = false;

  function openModal() {
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  let notifications: any[] = [];

  onMount(() => {
    // Handle the received props
    if ($session.user?.id) {
      console.log("USer is googed in", $session.user?.id);
      socket = new WebSocket(WS_ENDPOINT);
      socket.onmessage = (event) => {
        console.log("Msg is", event);
        if (extractMessage(event.data).receiver == Number($session.user?.id)) {
           //console.log("new Extracted Msg is mine");
          const extractedMessage = extractMessage(event.data);
          //  console.log("new Extracted Msg is", extractedMessage);
          const newNotification = {
            senderId: extractedMessage.sender,
            message: extractedMessage.message,
            timestamp: extractedMessage.time,
            id: extractedMessage.id,
          };
          // console.log("new Notification is", newNotification);
          const path = window.location.pathname;
          const parts = path.split("/");
          //check if user is already chating with the sender if not send them notificaion
          if (
            parts[1] !== "conversation" &&
            parts[2] !== newNotification.senderId.toString()
          ) {
            toast.success("New Notification");
            notifications = [...notifications, newNotification];
          }
        }
      };
    }
  });
</script>

<Toaster />
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

      <li>
        {#if $session.user?.name}
          <button
            on:click={openModal}
            type="button"
            class="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {#if notifications.length >= 1}
              <span
                class="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs"
              >
                {notifications.length}
              </span>
            {/if}
          </button>

          {#if isModalOpen}
            <div
              class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
            >
              <div
                class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50"
              />
              <div
                class="bg-white w-full lg:h-max lg:w-1/2 mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
              >
                <div class="head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
                  <button
                    class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
                    on:click={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                      ><path d="M0 0h24v24H0V0z" fill="none" /><path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                      /></svg
                    >
                  </button>
                </div>
                <div class="content p-8">
                  <div
                    class="h-[40vh] shadow-lg overflow-y-auto scrollbar scrollbar-thumb-indigo-100 scrollbar-track-gray-100"
                  >
                    <ul
                      role="list"
                      class="divide-y divide-gray-100 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                    >
                      {#each notifications as notification (notification.id)}
                        <div
                          class="flex w-full flex-col items-center my-2 space-y-4 sm:items-end"
                        >
                          <div
                            class="pointer-events-auto w-full rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 flex"
                          >
                            <div class="w-0 flex-1 p-4">
                              <div class="flex items-start">
                                <div class="ml-3 w-0 flex-1">
                                  <p class="text-sm font-medium text-gray-900">
                                    Message from User-{notification.senderId}-{Math.random(
                                      1000
                                    )}
                                  </p>
                                  <p class="mt-1 text-sm text-gray-500">
                                    {truncateText(notification.message, 5)} - {formatRelativeTime(
                                      notification.timestamp
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="flex border-l border-gray-200">
                              <button
                                on:click={() => {
                                  closeModal();
                                  goto(
                                    `/conversation/${notification.senderId}`
                                  );
                                }}
                                type="button"
                                class="flex items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >Reply</button
                              >
                            </div>
                          </div>
                        </div>
                      {/each}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        {/if}
      </li>
      {#if $session.user?.name}
        <li>
          <div class="text-white hover:underline">
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
