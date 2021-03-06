import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import './UnProducto.css'
import { paxios } from "../../utlts/Axios";
import { AddButton } from '../cmns/Buttons';
import {PRODUCT_SET_CURRENT} from '../../utlts/store/reducers/prods.reducer';

import blusas from '../../assets/blusa1.jpg'

const UnProducto =  ()=>{
    const [{prods}, dispatch] = useStateContext();
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
    

    if(!form.colores){
        var listElements =
         <div key={"mensaje"}>
             <Field
                type="text"
                id="msg"
                caption="Mensaje" 
                value="Toca + para agregar los detalles" 
                readOnly={true}
            />
        </div>
    }else{
        listElements = form.colores.map((o)=>{
       
            return (
            <div className="contDescripcionColyTallas" key={o.ide}>

                <Field
                    type="text"
                    id={o.color} 
                    placeholder="Color de Blusa"
                    caption="Color de la blusa" 
                    value={o.color} 
                    readOnly={true}
                />

            <li className="tallas">
                 <div className="tallasInt">
                <Field
                    type="text"
                    id={o.talla_s} 
                    placeholder='Disponibles en talla: "S"'
                    caption='Talla "S"'
                    value={o.talla_s} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_m} 
                    placeholder='Disponibles en talla: "m"'
                    caption='Talla "M"'
                    value={o.talla_m} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_l} 
                    placeholder='Disponibles en talla: "l"'
                    caption='Talla "L"'
                    value={o.talla_l} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_xl} 
                    placeholder='Disponibles en talla: "xl"'
                    caption='Talla "XL"'
                    value={o.talla_xl} 
                    readOnly={true}
                />
                </div>
            </li>
            </div>);
        })
    }
    

    return (
        <Page headding= {form.nombre}>
            <div className="contDescripcionColyTallas">
                <img src={blusas}/>
        
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
                    caption="precio Lps."
                    value={form.precio}
                    readOnly={true}
                />
            </div>
            {listElements}
            <section className="loginsection">
                <button onClick={()=>{history.push("/productos")}}>Cancelar</button>
            </section>
            <AddButton style={{position:"fixed", right:"1em", bottom:"2em"}} 
            onClick={() => { dispatch({ type: PRODUCT_SET_CURRENT, payload:{_id:prods.currentId}}); history.push("/productos/one/blusas/add");}}>

            </AddButton>
        </Page>
    );



}

export default UnProducto;
// nombre 
    // descripcion 
    // categoria 
    // precio