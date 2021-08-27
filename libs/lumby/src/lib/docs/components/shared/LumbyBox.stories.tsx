import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { BoxProps, LumbyBox } from '../../../components';

const initialBox: Partial<BoxProps> = {
  ...new LumbyFiber(),
  variant: 'default',
  content: [0, 1],
  margins: 'none',
} as LumbyFiber;

export const Box: Story<Partial<BoxProps>> = (args) => {
  return (
    <LumbyBox {...args}>
      <div>This is a Box</div>
    </LumbyBox>
  );
};
Box.args = initialBox;

export default {
  component: LumbyBox,
  title: 'Components/Shared/Box',
} as Meta;
