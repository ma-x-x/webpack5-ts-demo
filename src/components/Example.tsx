import React, { useState } from 'react';
import { Badge, Button } from 'antd';

function Counter() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  function handleClickFn() {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <>
      <Badge>{count}</Badge>
      <Button onClick={handleClick}>+</Button>
      <Button onClick={handleClickFn}>+</Button>
    </>
  );
}

export default Counter;
