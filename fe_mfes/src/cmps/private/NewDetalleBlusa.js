import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import '../public/Login.css'
import { paxios } from "../../utlts/Axios";

const NewProducto =  ()=>{
    const [{prods}, dispatch] = useStateContext();
    const [form, setForm] = useState({color:'', talla_s:0, talla_m: 0, talla_l:0, talla_xl:0, img:'', cod_color:''});
    const history = useHistory();
    const onChange = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const {name, value} = e.target;
        let newForm = {...form, [name]:value};
        setForm(newForm);
        
    }
    const addNewProducto = (e)=>{
        const _id = prods.currentId;
        e.preventDefault();
        e.stopPropagation();
        paxios.put(`/api/productos/blusas/add/${_id}` , form)
        .then((data)=>{
            console.log(data);
            history.push('/productos/one');
        })
        .catch((ex)=>{
            console.log(ex);
            alert("Algo salio mal al ingresar");
        })
    }
    return (
        <Page headding= "Nuevo Color">
             <Field
                type="text"
                id= "color" 
                placeholder="Color de Blusa"
                onChange={onChange}
                caption="Color de la blusa" 
                value={form.color} 
                
            />
            <Field
                type="text"
                id='talla_s'
                placeholder='Disponibles en talla: "S"'
                onChange={onChange}
                caption='Talla "S"'
                value={form.talla_s} 
                
            />
            <Field
                type="text"
                id='talla_m'
                placeholder='Disponibles en talla: "m"'
                onChange={onChange}
                caption='Talla "m"'
                value={form.talla_m} 
                
            />
            <Field
                type="text"
                id='talla_l'
                placeholder='Disponibles en talla: "l"'
                onChange={onChange}
                caption='Talla "l"'
                value={form.talla_l} 
                
            />
            <Field
                type="text"
                id='talla_xl' 
                placeholder='Disponibles en talla: "xl"'
                onChange={onChange}
                caption='Talla_xl'
                value={form.talla_xl} 
                
            />
            <Field
                type="text"
                id='cod_color'
                onChange={onChange}
                caption='Codigo de color'
                value={form.cod_color} 
                
            />
            
            <section className="loginsection">
                <button onClick={addNewProducto}>Agregar</button>
                <button onClick={()=>{history.push("/productos")}}>Cancelar</button>
            </section>
        </Page>
    );



}

export default NewProducto;
