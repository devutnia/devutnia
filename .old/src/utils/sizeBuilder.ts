import { MotifSizing } from './../../types.d';

export function sizeBuilder<Sizes = MotifSizing>(sizes?: Sizes): MotifSizing {
  let size = { xs: '', sm: '', md: '', lg: '', xl: '' };

  if (typeof sizes === 'object') size = { ...size, ...sizes };
  else if (sizes) {
    console.log('spread "md" value across the spectrum');
  }

  return size;
}
