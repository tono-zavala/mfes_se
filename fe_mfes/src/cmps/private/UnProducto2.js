import {useStateContext} from "../../utlts/Context";
import Page from '../cmns/Page';
import Field from '../cmns/Field'
import {useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import './UnProducto.css'
import { paxios } from "../../utlts/Axios";
import { AddButton } from '../cmns/Buttons';
import {PRODUCT_SET_CURRENT} from '../../utlts/store/reducers/prods.reducer';

import jeans from '../../assets/jeansMaite2.png'

const UnProducto =  ()=>{
    const [{prods}, dispatch] = useStateContext();
    const [form, setForm] = useState({nombre:'', descripcion:'', precio: '', categoria:'jeans'});
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
                history.push('/productos2')
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
                    placeholder="Color del Jean"
                    caption="Color del Jean" 
                    value={o.color} 
                    readOnly={true}
                />

            <li className="tallas">
                 <div className="tallasInt">
                <Field
                    type="text"
                    id={o.talla_3} 
                    placeholder='Disponibles en talla: "3"'
                    caption='Talla "3"'
                    value={o.talla_3} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_5} 
                    placeholder='Disponibles en talla: "5"'
                    caption='Talla "5"'
                    value={o.talla_5} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_7} 
                    placeholder='Disponibles en talla: "7"'
                    caption='Talla "7"'
                    value={o.talla_7} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_9} 
                    placeholder='Disponibles en talla: "9"'
                    caption='Talla "9"'
                    value={o.talla_9} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_11} 
                    placeholder='Disponibles en talla: "11"'
                    caption='Talla "11"'
                    value={o.talla_11} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_13} 
                    placeholder='Disponibles en talla: "13"'
                    caption='Talla "13"'
                    value={o.talla_13} 
                    readOnly={true}
                />
                <Field
                    type="text"
                    id={o.talla_15} 
                    placeholder='Disponibles en talla: "15"'
                    caption='Talla "15"'
                    value={o.talla_15} 
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
                <img src={jeans}/>
        
                <Field
                    type="text"
                    id="descripcion"
                    placeholder="Descripción de Jeans"
                    caption="descripcion"
                    value={form.descripcion}
                    readOnly={true}
                />
                <Field
                    type="text"
                    id="precio"
                    placeholder="Precio de Jeans"
                    caption="precio Lps."
                    value={form.precio}
                    readOnly={true}
                />
            </div>
            {listElements}
            <section className="loginsection">
                <button onClick={()=>{history.push("/productos2")}}>Cancelar</button>
            </section>
            <AddButton style={{position:"fixed", right:"1em", bottom:"2em"}} 
            onClick={() => { dispatch({ type: PRODUCT_SET_CURRENT, payload:{_id:prods.currentId}}); history.push("/productos/one/jeans/add2");}}>

            </AddButton>
        </Page>
    );



}

export default UnProducto;
// nombre 
    // descripcion 
    // categoria 
    // precio