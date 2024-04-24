/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Router} from './charon';
import {decode} from 'base-64';

global.atob = decode;

const context = require.context(
  './src/app',
  true,
  // Ignore root `./+html.js` and API route files `./generate+api.tsx`.
  /^(?:\.\/)(?!(?:(?:(?:.*\+api)|(?:\+html)))\.[tj]sx?$).*\.[tj]sx?$/,
);

export default function App() {
  return (
    <Router
      context={context}
      linking={{
        prefixes: ['Instahub://'],
        getInitialURL: () => 'Instahub://menu',
      }}
    />
  );
}

AppRegistry.registerComponent(appName, () => App);
