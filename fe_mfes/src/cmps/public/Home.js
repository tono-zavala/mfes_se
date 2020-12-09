import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../cmns/Page';
import './Home.css';

import logo from '../../assets/logo3.png'
const Home = ( {} )=>{
    let [redirect, setRedirect] = useState("");
    if (redirect !==""){
        return(<Redirect to={redirect}></Redirect>)
    }
    return(
        <Page headding="Maite Fashion Tienda en Linea" footer={true}>
            <section className="homesection">
                <section>
                    <img src={logo}/>
                </section>
                <section><button onClick={(e)=>{setRedirect("/login")}}>Iniciar Sesión</button>
                <button onClick={(e)=>{setRedirect("/sigin")}}>Registrarse</button>
                </section>
            </section>
        </Page>
    )
}

export default Home;