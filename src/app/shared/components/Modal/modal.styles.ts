import styled, { css } from 'styled-components';
import { Transition } from '../Animations';

const baseStyles = css`
	background: white;
	border: lightgrey;
	max-width: 500px;
	padding: 2em;
	position: fixed;
	width: 100%;
	z-index: 5;
	overflow: auto;
`;

export const ModalContent = styled.div`
	position: relative;

	h2 {
		font-size: 22px;
	}

	button {
		background: white;
		border: none;
		position: absolute;
		font-size: 24px;
		border-radius: 50%;
		color: darkred;
		top: 0;
		right: 0;
		margin-top: -1.3em;
		margin-right: -1.3em;

		:focus,
		:active {
			outline: none;
		}

		.close-icon {
			border-radius: 50%;
			background: darkred;
			border: none;
			transition: all 0.4s;

			:hover {
				color: darkred;
				background: white;
			}
		}
	}
`;

export const Dialog = styled(Transition)`
	${baseStyles};
	border-radius: 10px;
	top: 50%;
	left: 50%;
`;

export const RightPanel = styled(Transition)`
	${baseStyles};
	top: 0;
	right: 0;
	height: 100vh;
`;

export const LeftPanel = styled(Transition)`
	${baseStyles};
	top: 0;
	left: 0;
	height: 100vh;
`;

export const TopPanel = styled(Transition)`
	${baseStyles};
	top: 0;
	left: 30%;
`;
