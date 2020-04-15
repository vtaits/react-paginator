import React from 'react';
import PropTypes from 'prop-types';

import {
  LinkComponent,
} from '../types';

const Link: LinkComponent = (props) => {
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
};

Link.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.any),
};

Link.defaultProps = {
  disabled: false,
  href: null,
  onClick: undefined,
  className: undefined,
  style: undefined,
};

export default Link;
