import React from 'react';
import './App.css';
import CardTest from '@/components/card/CardTest';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <CardTest name="test" />
      </div>
    </RecoilRoot>
  );
}

export default App;
