import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const ToggleBtn = styled.button`
	position: fixed;
  right: 5%;
  bottom: 5%;
  font-size: 15px;
  padding :15px 10px;
  color: ${props => props.theme.textColor};
	border-color: ${props => props.theme.textColor};
  border-radius: 50%;
	background-color: transparent;	/* 배경 투명 */
  outline: none;

	&:hover {
		font-weight: bold;
	}
`;



export default function ToggleModeBtn() {
	const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(curr => !curr);

	return (
		<ToggleBtn onClick={toggleDarkAtom}>MODE</ToggleBtn>
	)
}
