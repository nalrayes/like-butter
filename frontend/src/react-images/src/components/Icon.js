import PropTypes from 'prop-types';
import React from 'react';
import arrowLeft from '../icons/arrowLeft';
import arrowRight from '../icons/arrowRight';
import details from '../icons/details';
import close from '../icons/close';

const icons = { arrowLeft, arrowRight, close, details };

const Icon = ({ fill, type, ...props }) => {
	const icon = icons[type];

	return (
		<span
			dangerouslySetInnerHTML={{ __html: icon(fill) }}
			{...props}
		/>
	);
};

Icon.propTypes = {
	fill: PropTypes.string,
	type: PropTypes.oneOf(Object.keys(icons)),
};
Icon.defaultProps = {
	fill: 'white',
};

export default Icon;
