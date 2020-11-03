import React from 'react';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

const mockReduxStore = (initialState, mergeState) => Story => {
  const store = getStore(initialState, mergeState);

  if (process.env.STORYBOOK_ACTIVE && !process.env.JEST_ACTIVE) {
    console.log('Store:', store.getState());
  }

  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

const getStore = (initialState, mergeState = {}) => ({
  getState: () => merge(cloneDeep(initialState), mergeState),
  subscribe: () => 0,
  dispatch: action('dispatch'),
});

export default mockReduxStore;
