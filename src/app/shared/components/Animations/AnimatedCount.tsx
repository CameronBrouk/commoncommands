import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { interval } from 'rxjs';
import { take, delay } from 'rxjs/operators';

type Props = {
	count: number;
	className?: string;
};

export const AnimatedCount = ({ count, className }: Props) => {
	const [number, setNumber] = useState(0);

	const transitions = useTransition(number, number, {
		from: { transform: 'translate3d(0,-10px,0)', opacity: 0 },
		enter: { transform: 'translate3d(0, 0px,0)', opacity: 1 },
		leave: {
			transform: 'translate3d(0, 10px,0)',
			opacity: 0,
			position: 'absolute',
		},
	});

	useEffect(() => {
		const count$ = interval(75)
			.pipe(
				delay(100),
				// map((num) => num + count / 2),
				take(count + 1)
			)
			.subscribe(setNumber);

		return () => {
			count$.unsubscribe();
		};
	}, [count]);

	return (
		<span style={{ position: 'relative' }} className={className}>
			{transitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props as object}>
					{item}
				</animated.div>
			))}
		</span>
	);
};
