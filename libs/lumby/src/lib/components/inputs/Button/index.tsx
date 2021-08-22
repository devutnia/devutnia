import { SharedButton } from '../../shared';
import { LumbyExtends } from '../../../core';

export interface ButtonProps extends LumbyExtends<'button'> {
  icon?: React.ReactElement;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <SharedButton {...props}>{children}</SharedButton>;
};