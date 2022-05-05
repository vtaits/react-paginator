import type {
  ReactElement,
} from 'react';

import type {
  LinkComponentProps,
} from '../types';

export function Link(props: LinkComponentProps): ReactElement {
  const {
    disabled,
    href,
    onClick,
    children,
    className,
    style,
  } = props;

  if (disabled) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        disabled
      >
        {children}
      </button>
    );
  }

  if (!href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={className}
        style={style}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

Link.defaultProps = {
  disabled: false,
  href: null,
  onClick: undefined,
  className: undefined,
  style: undefined,
};
