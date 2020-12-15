import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import '../public/Login.css'
import { paxios } from "../../utlts/Axios";


const UnProducto =  ()=>{
    const [{prods}, ] = useStateContext();
    const [form, setForm] = useState({nombre:'', descripcion:'', precio: '', categoria:'blusas'});
    const history = useHistory();
    useEffect(
        ()=>{
            const _id = prods.currentId;
            paxios.get(`/api/productos/one/${_id}`)
            .then(({data})=>{
                setForm(data);
                console.log(data);
            })
            .catch((ex)=>{
                console.log(ex);
                alert("Algo Salio Mal");
                history.push('/productos')
            })

        }
        ,[]
    )

    if(form.nombre===''){
        return (<h1>Cargando...</h1>);
    }

    return (
        <Page headding= {form.nombre}>
            <Field
                type="text"
                id="nombre"
                placeholder="Nombre de Blusa"
                caption="nombre"
                value={form.nombre}
                readOnly={true}
            />
            <Field
                type="text"
                id="descripcion"
                placeholder="Descripción de Blusa"
                caption="descripcion"
                value={form.descripcion}
                readOnly={true}
            />
            <Field
                type="text"
                id="precio"
                placeholder="Precio de Blusa"
                caption="precio"
                value={form.precio}
                readOnly={true}
            />
            <section className="loginsection">
                <button onClick={()=>{history.push('/productos/blusas/add')}}>Agregar Detalles</button>
                <button onClick={()=>{history.push("/productos")}}>Cancelar</button>
            </section>
        </Page>
    );



}

export default UnProducto;
// nombre 
    // descripcion 
    // categoria 
    // precio