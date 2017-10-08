// @flow
// @inheritedComponent ButtonBase

import React, { Children } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import StepLabel from './StepLabel';
import type { Orientation } from './Stepper';

const isLabel = children => {
  return children && Children.count(children) === 1 && children.type && children.type === StepLabel;
};

export const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    background: 'none',
  },
  alternativeLabelRoot: {
    margin: '0 auto',
  },
});

export type Icon = Element<any> | string | number;

type ProvidedProps = {
  active: boolean,
  alternativeLabel: boolean,
  classes: Object,
  completed: boolean,
  disabled: boolean,
  icon: Icon,
  last: boolean,
  optional: boolean,
  orientation: Orientation,
};

export type Props = {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel?: boolean,
  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: Element<any>,
  /**
   * @ignore
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed?: boolean,
  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled?: boolean,
  /**
   * The icon displayed by the step label.
   */
  icon?: Icon,
  /**
   * Pass down to the the `StepLabel` prop `iconContainerClassName`.
   */
  iconContainerClassName?: string,
  /**
   * @ignore
   */
  last?: boolean,
  /**
   * @ignore
   */
  optional?: boolean,
  /**
   * @ignore
   */
  orientation: Orientation,
};

function StepButton(props: ProvidedProps & Props) {
  const {
    active,
    alternativeLabel,
    children,
    className: classNameProp,
    completed,
    classes,
    disabled,
    icon,
    iconContainerClassName,
    last, // eslint-disable-line no-unused-vars
    optional,
    orientation,
    ...other
  } = props;

  const className = classNames(
    classes.root,
    {
      [classes.alternativeLabelRoot]: alternativeLabel,
    },
    classNameProp,
  );
  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    iconContainerClassName,
    optional,
    orientation,
  };
  const child = isLabel(children) ? (
    React.cloneElement(children, childProps)
  ) : (
    <StepLabel {...childProps}>{children}</StepLabel>
  );

  return (
    <ButtonBase disabled={disabled} className={className} {...other}>
      {child}
    </ButtonBase>
  );
}

export default withStyles(styles)(StepButton);
