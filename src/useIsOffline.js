import { ref, onMounted, onUnmounted } from "vue";

const useIsOffline = () => {
  const isOffline = ref(false);
  onMounted(() => {
    window.addEventListener("online", handleConnection);
    window.addEventListener("offline", handleConnection);
  });

  function handleConnection() {
    if (navigator.onLine) {
      isReachable(getServerUrl()).then(function (online) {
        isOffline.value = !online;
      });
    } else {
      // handle offline status
      isOffline.value = true;
    }
  }

  function isReachable(url) {
    /**
     * Note: fetch() still "succeeds" for 404s on subdirectories,
     * which is ok when only testing for domain reachability.
     *
     * Example:
     *   https://google.com/noexist does not throw
     *   https://noexist.com/noexist does throw
     */
    return fetch(url, { method: "HEAD", mode: "no-cors" })
      .then(function (resp) {
        return resp && (resp.ok || resp.type === "opaque");
      })
      .catch(function (err) {
        console.warn("[conn test failure]:", err);
      });
  }

  function getServerUrl() {
    return window.location.origin;
  }
  onUnmounted(() => {
    window.removeEventListener("online", handleConnection);
    window.removeEventListener("offline", handleConnection);
  });
  return isOffline;
};
export default useIsOffline;
