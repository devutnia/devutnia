import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { ButtonProps, LumbyButton } from '../../../components';

const initialButton: Partial<ButtonProps> = {
  ...new LumbyFiber(),
  content: [0, 0],
} as LumbyFiber;

export const Button: Story<Partial<ButtonProps>> = (args) => {
  return (
    <LumbyButton {...args}>
      <div>This is a Button</div>
    </LumbyButton>
  );
};
Button.args = initialButton;

export default {
  component: LumbyButton,
  title: 'Components/Shared/Button',
} as Meta;
