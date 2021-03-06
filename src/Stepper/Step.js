// @flow

import React from 'react';
import type { Element, Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import type { Orientation } from './Stepper';

export const styles = (theme: Object) => ({
  root: {
    flex: '0 0 auto',
  },
  horizontal: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  alternativeLabel: {
    flex: 1,
    position: 'relative',
    marginLeft: 0,
  },
});

type ProvidedProps = {
  alternativeLabel: boolean,
  classes: Object,
  connector: Element<any>,
  disabled: boolean,
  index: number,
  last: boolean,
  optional: boolean,
  orientation: Orientation,
};

export type Props = {
  /**
   * Sets the step as active. Is passed to child components.
   */
  active?: boolean,
  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel prop.
   */
  alternativeLabel?: boolean,
  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
   */
  children?: Node,
  /**
   * @ignore
   */
  classes?: Object,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed?: boolean,
  /**
   * @ignore
   * Passed down from Stepper if alternativeLabel is also set.
   */
  connector?: Element<any>,
  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled?: boolean,
  /**
   * @ignore
   * Used internally for numbering.
   */
  index?: number,
  /**
   * @ignore
   */
  last?: boolean,
  /**
   * Define this step as optional.
   */
  optional?: boolean,
  /**
   * @ignore
   */
  orientation?: Orientation,
};

function Step(props: ProvidedProps & Props) {
  const {
    active,
    alternativeLabel,
    completed,
    connector,
    disabled,
    index,
    last,
    orientation,
    children,
    classes,
    optional,
    ...other
  } = props;

  const className = classNames(classes.root, classes[orientation], {
    [classes.alternativeLabel]: alternativeLabel,
  });

  return (
    <div className={className} {...other}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          active,
          alternativeLabel,
          completed,
          disabled,
          icon: index + 1,
          last,
          orientation,
          optional,
          ...child.props,
        }),
      )}
      {connector &&
        alternativeLabel &&
        !last &&
        React.cloneElement(connector, { orientation, alternativeLabel })}
    </div>
  );
}

Step.defaultProps = {
  active: false,
  completed: false,
  disabled: false,
  optional: false,
};

export default withStyles(styles)(Step);
