import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import '../public/Login.css'
import { paxios } from "../../utlts/Axios";

const NewProducto =  ()=>{
    const [, dispatch] = useStateContext();
    const [form, setForm] = useState({nombre:'', descripcion:'', precio: '', categoria:'blusas'});
    const history = useHistory();
    const onChange = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const {name, value} = e.target;
        let newForm = {...form, [name]:value};
        setForm(newForm);
        
    }
    const addNewProducto = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        paxios.post('/api/productos/new' , form)
        .then((data)=>{
            console.log(data);
            history.push('/productos');
        })
        .catch((ex)=>{
            console.log(ex);
            alert("Algo salio mal al ingresar");
        })
    }
    return (
        <Page headding= "Nueva Blusa">
            <Field
                type="text"
                id="nombre"
                placeholder="Nombre de Blusa"
                onChange={onChange}
                caption="nombre"
                value={form.nombre}
            />
            <Field
                type="text"
                id="descripcion"
                placeholder="Descripción de Blusa"
                caption="descripcion"
                value={form.descripcion}
                onChange={onChange}
            />
            <Field
                type="text"
                id="precio"
                placeholder="Precio de Blusa"
                onChange={onChange}
                caption="precio"
                value={form.precio}
            />
            <section className="loginsection">
                <button onClick={addNewProducto}>Agregar</button>
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