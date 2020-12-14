import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import '../public/Login.css'
import { paxios } from "../../utlts/Axios";

const NewProducto =  ()=>{
    const [{prods}, dispatch] = useStateContext();
    const [form, setForm] = useState({nombre:'', descripcion:'', precio: '', categoria:'blusas'});
    const history = useHistory();
    
    return (
        <Page headding= {form.nombre}>
            <Field
                type="text"
                id="nombre"
                placeholder="Nombre de Blusa"
                caption="nombre"
                value={form.nombre}
                readonly={true}
            />
            <Field
                type="text"
                id="descripcion"
                placeholder="Descripción de Blusa"
                caption="descripcion"
                value={form.descripcion}
                readonly={true}
            />
            <Field
                type="text"
                id="precio"
                placeholder="Precio de Blusa"
                caption="precio"
                value={form.precio}
                readonly={true}
            />
            <section className="loginsection">
                <button onClick={()=>{history.push('/productos/blusas/add/'+{})}}>Agregar </button>
                <button onClick={()=>{history.push("/productos")}}>Cancelar</button>
            </section>
        </Page>
    );



}

export default NewProducto;
// nombre 
    // descripcion 
    // categoria 
    // precio