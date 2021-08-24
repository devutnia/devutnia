import { css } from '@emotion/react';
import { Story, Meta } from '@storybook/react';

import { LumbyFiber } from '../../../core';
import { GridProps, LumbyGrid } from '../../../components/shared';

const initialGrid: Partial<GridProps> = {
  ...new LumbyFiber(),
  gap: [10, 5],
  margins: 'none',
  content: [0, 0],
  variant: 'plain',
  paddings: 'none',
  grid: ['repeat', 200],
};

export const Grid: Story<GridProps> = (args) => (
  <LumbyGrid {...args}>
    <div style={{ backgroundColor: 'red' }}>This is a Box</div>
    <div style={{ backgroundColor: 'red' }}>This is a Box</div>
    <div style={{ backgroundColor: 'red' }}>This is a Box</div>
    <div style={{ backgroundColor: 'red' }}>This is a Box</div>
  </LumbyGrid>
);
Grid.args = initialGrid;

export default {
  component: LumbyGrid,
  title: 'Components/Shared',
} as Meta;
