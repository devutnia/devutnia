import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { GridProps, LumbyGrid } from '../../../components';

const initialGrid: Partial<GridProps> = {
  ...new LumbyFiber(),
  block: true,
  margins: 'none',
  variant: 'default',
  content: [-1, 0],
  grid: ['repeat', 150],
} as LumbyFiber;

export const Grid: Story<Partial<GridProps>> = (args) => (
  <LumbyGrid {...args}>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
    <div>This is a Grid div</div>
  </LumbyGrid>
);
Grid.args = initialGrid;

export default {
  component: LumbyGrid,
  title: 'Components/Shared/Grid',
} as Meta;
