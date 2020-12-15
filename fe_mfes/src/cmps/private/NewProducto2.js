import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import './NewProducto.css'
import { paxios } from "../../utlts/Axios";

const NewProducto2 =  ()=>{
    const [, dispatch] = useStateContext();
    const [form, setForm] = useState({nombre:'', descripcion:'', precio: '', categoria:'jeans'});
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
            history.push('/productos2');
        })
        .catch((ex)=>{
            console.log(ex);
            alert("Algo salio mal al ingresar");
        })
    }
    return (
        <Page headding= "Nuevo Jeans">
        <div className="generalNuevoProducto">
            <Field
                type="text"
                id="nombre"
                placeholder="Nombre del Jean"
                onChange={onChange}
                caption="nombre"
                value={form.nombre}
            />
            <Field
                type="text"
                id="descripcion"
                placeholder="Descripción del Jean"
                caption="descripcion"
                value={form.descripcion}
                onChange={onChange}
            />
            <Field
                type="text"
                id="precio"
                placeholder="Precio del Jean"
                onChange={onChange}
                caption="precio"
                value={form.precio}
            />
        </div>
            <section className="loginsection">
                <button onClick={addNewProducto}>Agregar</button>
                <button onClick={()=>{history.push("/productos2")}}>Cancelar</button>
            </section>
        </Page>
    );



}

export default NewProducto2;
// nombre 
    // descripcion 
    // categoria 
    // precio