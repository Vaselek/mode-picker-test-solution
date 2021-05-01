import React from 'react';
import './App.css';
import PlaygroundWrapper from "./components/PlaygroundWrapper/PlaygroundWrapper";
import {ErrorBoundary} from 'react-error-boundary';
import ErrorFallback from "./components/ErrorFallback/ErrorFallback";

function App() {

  return (
    <div>
      <div className='appContainer'>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PlaygroundWrapper />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
