import { HER_NAME } from './messages.js';

/*
  The ntfy app must subscribe to the same topic name used here. Because this
  repository is public, the topic name works like a password and should be
  treated as private.
*/

export const NTFY_TOPIC = "gift-sfsh1367fhhgf";
const sentEvents = new Set();

export function notify(text, eventKey = text) {
  if (sentEvents.has(eventKey)) return;
  sentEvents.add(eventKey);
  try {
    fetch("https://ntfy.sh/" + NTFY_TOPIC, {
      method: "POST",
      body: new Blob([text], { type: "text/plain; charset=UTF-8" }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Notifications are intentionally silent.
  }
}

export async function sendNtfy(text) {
  const response = await fetch("https://ntfy.sh/" + NTFY_TOPIC, {
    method: "POST",
    body: new Blob([text], { type: "text/plain; charset=UTF-8" }),
    keepalive: true,
  });
  if (!response.ok) throw new Error("Notification failed");
  return response;
}

export const openedMessage = `${HER_NAME} opened your birthday gift`;
