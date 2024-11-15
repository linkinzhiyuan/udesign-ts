import React from 'react';
import Button from '../index';

const App: React.FC = () => (
  <>
    <Button type="primary" size='large'>Primary Button</Button>
    <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </>
);

export default App;
