// App.js
import React from 'react';
import {Provider} from 'react-redux';
import Home from './app/screens/Home';
import {store} from './store';
import {SafeAreaView} from 'react-native';

const App = () => (
  <SafeAreaView>
    <Provider store={store}>
      <Home />
    </Provider>{' '}
  </SafeAreaView>
);

export default App;
