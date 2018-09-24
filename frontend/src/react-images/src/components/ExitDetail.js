import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';
import Icon from './Icon';

class ExitDetail extends Component{
	constructor(props) {
		super(props);
	}

	render() {
		const { closeButtonTitle } = this.props;
		const { theme } = this.context;
		const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

		return (
			<div className={css(classes.header)} {...this.props}>
					<button
						title={closeButtonTitle}
						className={css(classes.close)}
						onClick={this.props.triggerDetail}
					>
						<Icon fill={!!theme.close && theme.close.fill || defaults.close.fill} type="exitDetails" />
					</button>

			</div>
		);
	}
}

ExitDetail.propTypes = {
	showCloseButton: PropTypes.bool,
  triggerDetail: PropTypes.func
};
ExitDetail.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		height: defaults.header.height,
	},
	close: {
		background: 'none',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		position: 'relative',
		top: 0,
		verticalAlign: 'bottom',
    'left': '92%',

		// increase hit area
		height: 40,
		marginRight: -10,
		padding: 10,
		width: 40,
	},
};

export default ExitDetail;
