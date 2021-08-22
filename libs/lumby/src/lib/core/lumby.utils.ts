import { LumbyFiber } from './lumby.fiber';
import { LumbyKeys } from './lumby.types.d';

export const fiberStylesheet = (newFiber?: Partial<LumbyFiber>) => {
  const fiber = { ...new LumbyFiber(), ...newFiber };
  return {
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
        fiber.disabled || fiber.error
          ? 'not-allowed'
          : fiber.working
          ? 'progress'
          : undefined,
    }),
    corners: () => ({
      borderRadius:
        fiber.corners === 'disk'
          ? '100%'
          : fiber.corners === 'none'
          ? 'none'
          : fiber.theme.decorators.borderRadius[fiber.corners],
    }),
    elevate: (by = 0) => ({
      boxShadow:
        fiber.variant === 'plain' || fiber.flat || fiber.disabled || fiber.error
          ? 'none'
          : fiber.elevate
          ? fiber.theme.decorators.elevation[by + 1]
          : fiber.theme.decorators.elevation[by + 0],
    }),
    block: () => ({ width: fiber.block ? '100%' : 'fit-content' }),
    variant: (status: LumbyKeys['status'] = 'default') => {
      const selected = fiber.theme.variants[fiber.variant];
      if (fiber.error) return selected.error;
      if (fiber.disabled) return selected.disabled;
      if (fiber.working) return selected.working;
      return selected[status];
    },
  };
};