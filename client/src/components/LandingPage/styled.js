import styled from 'styled-components';
import './styles.css';

export const StyledDiv = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	margin: 0px -9px 0px -9px;
	.div_img {
		margin-top: 300px;
		width: 780px;
		margin-left: 550px;
		transition: 0.3s;
		&:hover {
			transition: 0.3s;
			transform: scale(1.04);
		}
	}
	.div_content {
		margin-top: 150px;
		border: 3px solid white;
		border-radius: 7px;
		width: 400px;
		padding: 20px 20px 20px 20px;
		margin-left: 550px;
        background-color: #000000a1;
		.h3 {
            text-align: center;
			font-size: 55px;
			color: white;
			text-shadow: 1px 2px 2px black;
			margin: 20px;
		}
		.p {
            padding-left: 50px;
			display: flex;
			justify-items: center;
			width: 300px;
			text-align: center;
			font-size: 30px;
			color: white;
			text-shadow: 1px 2px 2px black;
		}
	}
	.div_btn {
		display: flex;
		justify-content: start;
		margin-top: 30px;
		margin-left: 750px;
		
		.btn {
			width: 300px;
			height: 50px;
			border-style: solid;
			border-color: transparent;
			border-width: 1px;
			border-radius: 5px;
			color: white;
			background-color: transparent;
			text-shadow: 2px 2px 2px black;
			font-size: 30px;
			&:hover {
				transition: 0.3s;
				background-color: #000000a1;
				box-shadow: 0 0 5px 0 black;
				cursor: pointer;
			}
			&:active {
				outline: 0;
				transform: translateY(3px);
			}
		}
	}
`;