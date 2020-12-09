import {useState} from 'react';
import Page from '../cmns/Page';
import Field from '../cmns/Field';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = ()=> {

    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const onChange = (e)=>{
        const {name, value} = e.target;
        setForm ({
            ...form,  
            [name] : value,
        });

    }

    const onLogin = (e)=>{
        const {email, password} = form;
        console.log(email);
        console.log(password);
        }
        return(
            <Page headding="Iniciar Sesión" footer={true}>
                <section className="loginsection">
                    <Field id="email" caption="Correo: " type="text" value={form.email} onChange={onChange} />
                    <Field id="password" caption="Contraseña: " type="password" value={form.password} onChange={onChange} />
                    <button onClick={onLogin}>Login</button>
                    <Link to="/">Go Home</Link>
                </section>
            </Page>
        )
}

export default Login;