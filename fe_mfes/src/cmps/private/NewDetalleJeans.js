import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import './NewDetalleBlusa.css'
import { paxios } from "../../utlts/Axios";

const NewProducto =  ()=>{
    const [{prods}, dispatch] = useStateContext();
    const [form, setForm] = useState({color:'', talla_3:0, talla_5: 0, talla_7:0, talla_9:0,talla_11:0,talla_13:0,talla_15:0, img:'', cod_color:''});
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
        paxios.put(`/api/productos/jeans/add/${_id}` , form)
        .then((data)=>{
            console.log(data);
            history.push('/productos/one2');
        })
        .catch((ex)=>{
            console.log(ex);
            alert("Algo salio mal al ingresar");
        })
    }
    return (
        <Page headding= "Nuevo Color">
        <div className="generalNuevoDetalle">
             <Field
                type="text"
                id= "color" 
                placeholder="Color del jean"
                onChange={onChange}
                caption="Color del Jean" 
                value={form.color} 
                
            />
            <Field
                type="text"
                id='talla_3'
                placeholder='Disponibles en talla: "3"'
                onChange={onChange}
                caption='Talla "3"'
                value={form.talla_3} 
                
            />
            <Field
                type="text"
                id='talla_5'
                placeholder='Disponibles en talla: "5"'
                onChange={onChange}
                caption='Talla "5"'
                value={form.talla_5} 
                
            />
            <Field
                type="text"
                id='talla_7'
                placeholder='Disponibles en talla: "7"'
                onChange={onChange}
                caption='Talla "7"'
                value={form.talla_7} 
                
            />

            <Field
                type="text"
                id='talla_9'
                placeholder='Disponibles en talla: "9"'
                onChange={onChange}
                caption='Talla "9"'
                value={form.talla_9} 
                
            />
            <Field
                type="text"
                id='talla_11' 
                placeholder='Disponibles en talla: "11"'
                onChange={onChange}
                caption='Talla "11"'
                value={form.talla_11} 
                
            />
            <Field
                type="text"
                id='talla_13' 
                placeholder='Disponibles en talla: "13"'
                onChange={onChange}
                caption='Talla "13"'
                value={form.talla_13} 
                
            />

            <Field
                type="text"
                id='talla_15' 
                placeholder='Disponibles en talla: "15"'
                onChange={onChange}
                caption='Talla "15"'
                value={form.talla_15} 
                
            />
            <Field
                type="text"
                id='cod_color'
                onChange={onChange}
                caption='Codigo de color'
                value={form.cod_color} 
                
            />
        </div>
            <section className="loginsection">
                <button onClick={addNewProducto}>Agregar</button>
                <button onClick={()=>{history.push("/productos2")}}>Cancelar</button>
            </section>
        </Page>
    );



}

export default NewProducto;
