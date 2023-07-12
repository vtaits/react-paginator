import * as CSS from 'csstype';
import type {
  DefaultTheme,
} from 'styled-components';

export type CSSProperties = CSS.Properties<string | number>;

export type CSSPseudos = { [K in CSS.Pseudos]?: CSSObject };

export interface CSSObject extends CSSProperties, CSSPseudos {
  [key: string]: CSSObject | string | number | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIfEmpty<T extends object> = keyof T extends never ? any : T;

export type StyledProps<P> = P & {
  theme: AnyIfEmpty<DefaultTheme>;
};
