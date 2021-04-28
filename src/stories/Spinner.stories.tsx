import React from 'react';
import { storiesOf } from '@storybook/react';
import { Spinner } from '@/components/spinner/Spinner';

export default {
  title: 'Spinner',
  component: Spinner,
};

export const Default = () => (
  <div style={{ background: 'white', padding: '1.5em', position: 'relative' }}>
    <Spinner />
  </div>
);

export const Inverse = () => (
  <div style={{ background: 'black', padding: '1.5em', position: 'relative' }}>
    <Spinner inverse />
  </div>
);

export const InForm = () => (
  <div style={{ background: '#eee', padding: '1.5em', position: 'relative' }}>
    <Spinner inForm />
  </div>
);

export const Inline = () => (
  <div style={{ background: '#eee', padding: '1.5em', position: 'relative' }}>
    <Spinner inline />
  </div>
);

storiesOf('Spinner', module)
  .add('Default', () => <Default />)
  .add('Inverse', () => <Inverse />)
  .add('InForm', () => <InForm />)
  .add('Inline', () => <Inline />);
