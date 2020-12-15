import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Page from '../cmns/Page';
import './Home.css';
import { useStateContext } from '../../utlts/Context';
import logo from '../../assets/logo3.png'
const Home = ( {} )=>{
    const [{auth}, ] = useStateContext();
    let [redirect, setRedirect] = useState("");
    if (redirect !==""){
        return(<Redirect to={redirect}></Redirect>)
    }
    let section = (
        <section><button onClick={(e)=>{setRedirect("/login")}}>Iniciar Sesión</button>
            <button onClick={(e)=>{setRedirect("/signin")}}>Registrarse</button>
            </section>
    );
    if (auth.logged){
        section = (<div className="eslogan"><p>Vete Elegante y a la Moda con Maite Fashion</p></div>);
    }
    return(
        <Page headding="Maite Fashion Tienda en Linea" footer={true}>
            <section className="homesection">
                <section>
                    <img src={logo}/>
                </section>
                {section}
            </section>
        </Page>
    )
}

export default Home;