import { boot } from "quasar/wrappers";
import supabase from "vue-3-supabase";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default boot(({ app }) => {
  // Use supabase
  app.use(supabase, {
    supabaseUrl: "https://aaccpzqdxnjaqvxjpseg.supabase.co", // actually you can use something like import.meta.env.VITE_SUPABASE_URL
    supabaseKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiO" +
      "iJzdXBhYmFzZSIsInJlZiI6ImFhY2NwenFkeG5qYXF2eGpwc2VnIiwicm9sZSI6ImFub24iL" +
      "CJpYXQiOjE2NTE1MDEyMzYsImV4cCI6MTk2NzA3NzIzNn0.BkfOWnukox7SQ5L30l_pWS6vaOQQO-hHyEQ590acNag", // actually you can use something like import.meta.env.VITE_SUPABASE_KEY,
    options: {},
  });
});
