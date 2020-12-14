import { useState } from "react";
import { useStateContext } from "../../utlts/Context"
import { useHistory } from "react-router-dom";
import Page from "../cmns/Page";
import Field from "../cmns/Field";


const Signin = ()=> {
    const [,dispatch] = useStateContext();
    const [form, setForm] = useState({email:'', password:'',name:'',direction:''});

    const onChange = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const {name, value} = e.target;
        let newForm = {...form,[name]:value};
        setForm(newForm);
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
            id="name" 
            placeholder="Nombre" 
            onChange={onChange} 
            caption="Nombre"
            value={form.name}
            />

            <Field 
            type="text" 
            id="direction" 
            placeholder="Dirección" 
            onChange={onChange} 
            caption="Dirección"
            value={form.direction}
            />
            <section>
            <button onClick={()=>{alert("Click para registrar"+JSON.stringify(form))}}>Registrarse</button>
            </section>
        </Page>
    );
}

export default Signin;