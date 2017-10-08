import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
import SvgIcon from "../SvgIcon";
import { compose } from "recompose";

export const styles = theme => ({
  root: {
    fill: theme.palette.action.disabled,
    display: "block",
  },
  text: {
    fill: theme.palette.getContrastText(theme.palette.primary[500]),
    fontSize: theme.typography.caption.fontSize,
  },
  active: {
    fill: theme.palette.primary[500],
  },
});

function StepPositionIcon(props) {
  const { position, classes, active } = props;

  const className = classNames(
    classes.root,
    {
      [classes.active]: active,
    },
  );

  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="10"/>
      <text className={classes.text} x="12" y="16" textAnchor="middle">
        {position}
      </text>
    </SvgIcon>
  );
}

StepPositionIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * The step position as a number.
   */
  position: PropTypes.number.isRequired,
};

export default withStyles(styles)(StepPositionIcon);
