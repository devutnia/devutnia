import { render } from '@testing-library/react';

import Lumby from './lumby';

describe('Lumby', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Lumby />);
    expect(baseElement).toBeTruthy();
  });
});
