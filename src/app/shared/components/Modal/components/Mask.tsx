import React from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';

const Wrapper = styled(animated.div)`
	background: rgb(0, 0, 0, 0.8);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 5;
`;

export const Mask = (props: {
	isVisible: boolean;
	onClick?: React.MouseEventHandler;
}) => {
	const transitions = useTransition(props.isVisible, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	});

	return (
		<>
			{transitions.map(({ item, props: style }) => {
				return (
					item && <Wrapper style={style} key="mask" onClick={props.onClick} />
				);
			})}
		</>
	);
};
