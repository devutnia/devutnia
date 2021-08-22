import { LumbyFiber } from './lumby.fiber';
import { LumbyKeys } from './lumby.types.d';

export const fiberStylesheet = (fiber: LumbyFiber) => ({
  size: () => {
    const space = fiber.theme.size.spacing[fiber.size];
    const padding =
      typeof space === 'number'
        ? `${space / 2}px ${space + (space / space + 2)}px`
        : `calc(${space} / 2) calc(${space} + (${space} + (${space} / ${space} + 2)))`;

    return { padding, fontSize: fiber.theme.size.fontSize[fiber.size] };
  },
  cursor: () => ({
    cursor:
      fiber.disabled || fiber.error ? 'not-allowed' : fiber.working ? 'progress' : 'auto',
  }),
  corners: () => ({
    borderRadius:
      fiber.corners === 'disk'
        ? '100%'
        : fiber.corners === 'none'
        ? 'none'
        : fiber.theme.decorators.borderRadius[fiber.corners],
  }),
  elevate: () => ({
    boxShadow: fiber.elevate
      ? fiber.theme.decorators.elevation[1]
      : fiber.theme.decorators.elevation[0],
  }),
  block: () => ({ width: fiber.block ? '100%' : 'fit-content' }),
  variant: (status: LumbyKeys['status'] = 'default') => {
    const selected = fiber.theme.variants[fiber.variant];
    if (fiber.error) return selected.error;
    if (fiber.working) return selected.disabled;
    if (fiber.disabled) return selected.disabled;
    return selected[status];
  },
});
