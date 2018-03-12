import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';
import Icon from './Icon';

function Details ({
	direction,
	icon,
	onClick,
	size,
	...props,
},
{
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<button
			type="button"
			className={css(classes.arrow, size && classes['arrow__size__' + size], classes.footer)}
			onClick={onClick}
			onTouchEnd={onClick}
			{...props}
		>
			<Icon fill={!!theme.arrow && theme.arrow.fill || defaults.arrow.fill} type={icon} />
		</button>
	);
}

Details.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['medium', 'small']).isRequired,
};
Details.defaultProps = {
	size: 'small',
};
Details.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		outline: 'none',
		padding: 5, // increase

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},

	// sizes
	arrow__size__medium: {
		height: defaults.arrow.height,
		marginTop: defaults.arrow.height / -2,
		width: 40,

		'@media (min-width: 768px)': {
			width: 70,
		},
	},
	arrow__size__small: {
		height: defaults.thumbnail.size,
		marginTop: defaults.thumbnail.size / -1.3,
		width: 30,

		'@media (min-width: 500px)': {
			width: 45,
		},
	},

	// direction
	arrow__direction__right: {
		right: defaults.container.gutter.horizontal,
	},
	arrow__direction__left: {
		left: defaults.container.gutter.horizontal,
	},
  footer: {
    boxSizing: 'border-box',
    color: defaults.footer.color,
    cursor: 'auto',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'space-between',
    right: 0,
    lineHeight: 1.3,
    paddingBottom: defaults.footer.gutter.vertical,
    paddingLeft: defaults.footer.gutter.horizontal,
    paddingRight: defaults.footer.gutter.horizontal,
    paddingTop: defaults.footer.gutter.vertical,
  },
  footerCount: {
    color: defaults.footer.count.color,
    fontSize: defaults.footer.count.fontSize,
    paddingLeft: '1em', // add a small gutter for the caption
  },
  footerCaption: {
    flex: '1 1 0',
  },
};

export default Details;
