import {MdHome} from 'react-icons/md';
import {FaUserPlus} from 'react-icons/fa';
import {CgLogIn} from 'react-icons/cg';
import {GiArmoredPants} from 'react-icons/gi';
import {GiPoloShirt} from 'react-icons/gi';

import {NavLink} from 'react-router-dom';

import "./Footer.css";
const Footer =() =>{
    return(
        <footer>
            <nav>
                <ul>
                    <li><NavLink to="/"><MdHome size="2em"/></NavLink></li>
                    <li><NavLink to="/login"><CgLogIn size="2em" /></NavLink></li>
                    <li><NavLink to="/signin"><FaUserPlus size="2em"/></NavLink></li>
                    <li><NavLink to="/productos"><GiPoloShirt size="2em"/></NavLink></li>
                    <li><NavLink to="/productos2"><GiArmoredPants size="2em"/></NavLink></li>
                </ul>
            </nav>
        </footer>
    )
}
export default Footer;