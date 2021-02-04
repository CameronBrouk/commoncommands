import React from 'react';
import { animated, useTransition } from 'react-spring';

type TransitionProps = {
	config?: {
		friction?: number;
		mass?: number;
		tension?: number;
	};
	from: object;
	enter: object;
	leave: object;
};

interface Props {
	children: React.ReactNode;
	isVisible: boolean;
	transition: any;
	className?: string;
	// TODO: Scale is currently being omitted to resolve a typing issue
	// style?: Omit<React.CSSProperties, 'scale'>;
	style?: any;
	ref?: any;
}

// Use this to apply transitions to a single element when it mounts/unmounts
export const Transition = React.forwardRef(
	({ isVisible, transition, ...rest }: Props, ref) => {
		const { style, className, children } = rest;
		const transitions = useTransition(isVisible, null, transition);

		return (
			<>
				{transitions.map(
					({ item, key, props }) =>
						item && (
							<animated.div
								key={key}
								style={{ ...style, ...props }}
								className={className}
							>
								{children}
							</animated.div>
						)
				)}
			</>
		);
	}
);
