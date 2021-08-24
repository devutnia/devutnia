import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { LumbyButton } from '../../../components/shared';

export const Button: Story<LumbyFiber> = (args) => (
  <LumbyButton {...args}>Click</LumbyButton>
);
Button.args = new LumbyFiber();

export default {
  component: LumbyButton,
  title: 'Components/Shared',
} as Meta;
