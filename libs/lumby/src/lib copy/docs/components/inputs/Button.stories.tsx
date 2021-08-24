import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { Button } from '../../../components/inputs';

export const Shared: Story<LumbyFiber> = (args) => <Button {...args}>Click</Button>;
Shared.args = new LumbyFiber();

export default {
  component: Button,
  title: 'Components/Inputs/Buttons',
} as Meta;
