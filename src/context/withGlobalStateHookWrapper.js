import React from 'react';
import useGlobalState from './useGlobalState';

function withGlobalStateHookWrapper(Component) {
  return function WrappedComponent(props) {
    const globalState = useGlobalState();
    return <Component {...props} globalState={globalState} />;
  };
}

export default withGlobalStateHookWrapper;
