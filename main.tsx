import { AppRegistry } from 'react-native';
import App from './src/App';

// For web
if (typeof document !== 'undefined') {
  AppRegistry.registerComponent('main', () => App);
  AppRegistry.runApplication('main', {
    rootTag: document.getElementById('root'),
  });
} else {
  // For native (Expo)
  const { registerRootComponent } = require('expo');
  registerRootComponent(App);
}
