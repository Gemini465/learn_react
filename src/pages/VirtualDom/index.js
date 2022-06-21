import React, { useState } from 'react';
import './index.css';

const VirtualDom = () => {
  const [text, setText] = useState(
    'Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World'
  );
  return (
    <>
      <div onClick={() => setText(text + ' Hello World')} className='content'>
        {text}
      </div>
    </>
  );
};

export default VirtualDom;
