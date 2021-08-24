import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { BoxProps, LumbyBox } from '../../../components/shared';

const initialBox: Partial<BoxProps> = {
  ...new LumbyFiber(),
  margins: 'none',
  variant: 'plain',
  content: [0, 0],
};

export const Box: Story<BoxProps> = (args) => (
  <LumbyBox {...args}>
    <div>This is a Box</div>
  </LumbyBox>
);
Box.args = initialBox;

export default {
  component: LumbyBox,
  title: 'Components/Shared',
} as Meta;
