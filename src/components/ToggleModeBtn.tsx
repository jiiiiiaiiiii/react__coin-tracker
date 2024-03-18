import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const ToggleBtn = styled.span`
  position: fixed;
  right: 5%;
  top: 3%;
	width: 60px;
	fill: whitesmoke;
	&:hover {
		cursor: pointer;
	}
`;

export default function ToggleModeBtn() {
  const [isDark, setDarkAtom] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((curr) => !curr);

  return (
    <ToggleBtn onClick={toggleDarkAtom}>
      {isDark ? (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
          <path d='M192 64C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192s-86-192-192-192H192zm192 96a96 96 0 1 1 0 192 96 96 0 1 1 0-192z' />
        </svg>
      ) : (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
          <path d='M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352a96 96 0 1 0 0-192 96 96 0 1 0 0 192z' />
        </svg>
      )}
    </ToggleBtn>
  );
}