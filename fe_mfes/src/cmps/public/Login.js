import {useState} from 'react';
import Page from '../cmns/Page';

const Login = ()=>{
    
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    let onChange = (e)=>{
        console.log(e.target);
        if(e.target.name=="Email"){
            setEmail(e.target.value);
        }
        if(e.target.name=="Pwd"){
            setPwd(e.target.value);
        }
    }
    return (
        <Page headding="Iniciar Sesion">
            <section >
                <p>
                    <label>Correo:</label>
                    <input type="text" value={email} onChange={onChange}></input>
                </p>
                <p>
                    <label>Contraseña:</label>
                    <input type="text" value={pwd} onChange={onChange}></input>
                </p>
            
                <button>Login</button>
            </section>
        </Page>
    )
    

}

export default Login;