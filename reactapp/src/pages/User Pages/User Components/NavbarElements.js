import { FaCalendar } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

// export const colors = {
//     primary: "#fff",
//     theme: "#BE185D",
//     light1: "#F3F4F6",
//     light2: "#E5E7EB",
//     dark1: "#1F2937",
//     dark2: "#4B5563",
//     dark3: "#9CA3AF",
//     red: "#DC2626"
// }

export const Nav = styled.nav`
background: #F08080;
height: 85px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
/* Third Nav */
/* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
color: #FFFFFF;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 3rem;
height: 100%;
cursor: pointer;
font-size: 1.4rem;
&.active {
	color: #000000;
}

&:hover{
	text-decoration: underline;
	letter-spacing: 2px;
	font-weight: bold;
}

`;

export const Bars = styled(FaCalendar)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/*width: 100vw;*/
/* white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

