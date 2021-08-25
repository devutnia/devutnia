import { Story, Meta } from '@storybook/react';

import { LumbyFiber, LumbyLayer } from '../../core';

const initialLayer = { ...new LumbyFiber() } as LumbyFiber;

export const Layer: Story<LumbyFiber> = (args) => (
  <LumbyLayer {...args}>
    <div>This is a Layer</div>
  </LumbyLayer>
);
Layer.args = initialLayer;

export default {
  component: LumbyLayer,
  title: 'Core/Layer',
} as Meta;
