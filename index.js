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
  const [isSignedIn, setIsSignedIn] = useState(false);

  supabase.auth.getSession().then((user) => {
    if (user.accessToken) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  console.log("isSignedIn", isSignedIn);

  return (
    <Router
      context={context}
      linking={{
        prefixes: ["Instahub://"],
        getInitialURL: () => "Instahub://auth/login",
      }}
    />
  );
}

AppRegistry.registerComponent(appName, () => App);
