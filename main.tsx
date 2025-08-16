import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import App from './src/App';

// Register the app
declare const module: { hot?: { accept: () => void } };
if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent('main', () => App);

// For web
if (typeof document !== 'undefined') {
  AppRegistry.runApplication('main', {
    rootTag: document.getElementById('root') || document.getElementById('app'),
  });
}

registerRootComponent(App);
