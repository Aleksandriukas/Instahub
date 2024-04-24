/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { Router } from "./charon";
import { decode } from "base-64";
import { supabase } from "./src/supabase/supabase";
import { useState } from "react";

global.atob = decode;

const context = require.context(
  "./src/app",
  true,
  // Ignore root `./+html.js` and API route files `./generate+api.tsx`.
  /^(?:\.\/)(?!(?:(?:(?:.*\+api)|(?:\+html)))\.[tj]sx?$).*\.[tj]sx?$/
);

export default function App() {
  return (
    <Router
      context={context}
      linking={{
        prefixes: ["Instahub://"],
        getInitialURL: async () => {
          const { data } = await supabase.auth.getSession();

          console.log("url", Boolean(data.session.access_token));
          if (data.session.access_token) {
            return "Instahub://main/home";
          }
          return "Instahub://auth/login";
        },
      }}
    />
  );
}

AppRegistry.registerComponent(appName, () => App);
