import { useState } from "react";
import { useStateContext } from "../../utlts/Context"
import { paxios } from "../../utlts/Axios";
import { useHistory } from "react-router-dom";
import Page from "../cmns/Page";
import Field from "../cmns/Field";
import { PrimaryButton, SecondaryButton } from '../cmns/Buttons'


const Signin = ()=> {
    const [,dispatch] = useStateContext();
    const [form, setForm] = useState({email:'', password:'',nombre:'',direccion:''});
    const history = useHistory(); 
    const onChange = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const {name, value} = e.target;
        let newForm = {...form,[name]:value};
        setForm(newForm);
    }
    const addRegistro = (e) => {
        e.preventDefault();
        e.stopPropagation();
        paxios.post('api/seguridad/signin', form)
            .then((data) =>{
                console.log(data)
                history.push("/");
            })
            .catch((ex) => {
                console.log(ex);
                alert("Algo salio mal al registrar");
            })
    }
    return (
        <Page headding="Registrarse" footer={true}>
            <Field 
            type="email" 
            id="email" 
            placeholder="correo" 
            onChange={onChange} 
            caption="correo"
            value={form.email}
            />

            <Field 
            type="password" 
            id="password" 
            placeholder="contraseña" 
            onChange={onChange} 
            caption="contraseña"
            value={form.password}
            />

            <Field 
            type="text" 
            id="nombre" 
            placeholder="Nombre" 
            onChange={onChange} 
            caption="Nombre"
            value={form.nombre}
            />

            <Field 
            type="text" 
            id="direccion" 
            placeholder="Dirección" 
            onChange={onChange} 
            caption="Dirección"
            value={form.direccion}
            />
            <section>
            <PrimaryButton onClick={addRegistro}>Registrarse</PrimaryButton>
            <SecondaryButton onClick={ () => { history.push("/")}}>Regresar</SecondaryButton>
            </section>
        </Page>
    );
}

export default Signin;