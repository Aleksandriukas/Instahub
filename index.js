/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import MainLayout from "./src/app/Layout";

export default function App() {
  return <MainLayout />;
}

AppRegistry.registerComponent(appName, () => App);
