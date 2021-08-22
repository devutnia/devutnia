import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '.';
import { LumbyFiber } from '../../../core';

export const Base: Story<ButtonProps> = (args) => <Button {...args}>Click</Button>;
Base.args = new LumbyFiber();

export default {
  component: Button,
  title: 'Button',
} as Meta;
