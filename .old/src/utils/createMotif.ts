import { sizeBuilder } from '../utils';
import type { Motif, MotifLoader } from '../../types.d';

const corners = { xs: '2px', sm: '4px', md: '8px', lg: '14px', xl: '22px' };
const fonts = { xs: '10px', sm: '12px', md: '16px', lg: '24px', xl: '36px' };
const spacings = { xs: '2px', sm: '6px', md: '12px', lg: '20px', xl: '28px' };

export function createMotif(motif_loader?: MotifLoader) {
  const motif: Motif = {
    elevation: {
      0: 'none',
      1: '0 0 5px 2px rgba(0,0,0,0.2)',
      2: '0 0 10px 4px rgba(0,0,0,0.4)',
    },
    color: {
      light: '#f5f5f5',
    },
    scheme: {
      base: {
        sheet: {},
        toggles: { size: 'md', scheme: 'base', paddings: 'size' },
      },
    },
    sizings: {
      fonts: sizeBuilder(fonts),
      corners: sizeBuilder(corners),
      margins: sizeBuilder(spacings),
      paddings: sizeBuilder(spacings),
    },
  };

  if (motif_loader) {
    motif_loader({
      color: (name, color) => {
        motif.color = { ...motif.color, [name]: color };
      },
      scheme: (name, scheme) => {
        if (name === 'base') throw Error(`Use ".base()" function to adjust this scheme`);
        motif.scheme = { ...motif.scheme, [name]: scheme(motif) };
      },
      sizing: (name, sizing) => {
        motif.sizings = { ...motif.sizings, [name]: sizeBuilder(sizing) };
      },

      base: (scheme) => {
        const base = motif.scheme['base'];
        if (scheme?.sheet) base.sheet = { ...base.sheet, ...scheme.sheet };
        if (scheme?.toggles) base.toggles = { ...base.toggles, ...scheme.toggles };
      },
    });
  }

  return motif;
}
