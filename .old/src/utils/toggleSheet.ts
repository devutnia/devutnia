import { Motif, MotifScheme, SheetToggles } from '../../types.d';

export function toggleSheet(
  motif: Motif,
  sheet_toggles: SheetToggles
): MotifScheme['sheet'] {
  const toggles = Object.assign(motif.scheme[sheet_toggles?.scheme || 'base'].toggles, {
    ...sheet_toggles,
  });

  const applySize = (attr: 'margins' | 'paddings' | 'corners' | 'fonts') => {
    const attr_sizing = motif.sizings[attr];

    if (toggles[attr] === 'none') return 'none';
    if (toggles[attr] === 'size') return attr_sizing[toggles.size as never];
    if (toggles[attr]) return attr_sizing[toggles[attr as never]];
    if (attr === 'fonts') return attr_sizing[toggles.size as never];

    return undefined;
  };

  const applyElevation = (elevate?: boolean | number | string) => {
    if (elevate) {
      if (typeof elevate === 'boolean') return motif?.elevation?.[1];
      return motif?.elevation?.[elevate];
    }
    return undefined;
  };

  const margin = applySize('margins');
  const fontSize = applySize('fonts');
  const padding = applySize('paddings');
  const borderRadius = applySize('corners');

  const boxShadow = applyElevation(toggles?.elevate);

  const width = toggles?.full ? '100vw' : toggles?.stretch ? '100%' : undefined;
  const height = toggles?.full ? '100vw' : toggles?.stretch ? '100%' : undefined;

  return {
    width,
    height,
    margin,
    padding,
    fontSize,
    boxShadow,
    borderRadius,
  };
}
