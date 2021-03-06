import Page from '../cmns/Page';
import { AddButton } from '../cmns/Buttons';
import './ListProductos.css';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../utlts/Context';
import {paxios} from '../../utlts/Axios';
import {useHistory} from 'react-router-dom';

import blusas from '../../assets/blusa1.jpg'

import {PRODUCT_LOADED, PRODUCT_LOADING, PRODUCT_INIT, PRODUCT_SET_CURRENT} from '../../utlts/store/reducers/prods.reducer';

// const dummyData = [
//     {"_id": 1,"label":"contenido 1","count":1},
//     {"_id": 2,"label":"contenido 2","count":2},
//     {"_id": 3,"label":"contenido 3","count":3},
//     {"_id": 4,"label":"contenido 4","count":4},
//     {"_id": 5,"label":"contenido 5","count":5},
//     {"_id": 6,"label":"contenido 6","count":6},
//     {"_id": 7,"label":"contenido 7","count":7},
//     {"_id": 8,"label":"contenido 8","count":8},
//     {"_id": 9,"label":"contenido 9","count":9},
//     {"_id": 10,"label":"contenido 10","count":10},
//     {"_id": 11,"label":"contenido 11","count":11},
//     {"_id": 12,"label":"contenido 12","count":12},
//     {"_id": 13,"label":"contenido 13","count":13},
//     {"_id": 14,"label":"contenido 14","count":14},
//     {"_id": 15,"label":"contenido 15","count":15},
//     {"_id": 16,"label":"contenido 16","count":16},
// ];

const ListProductos = () =>{
    const history = useHistory();
    const[{prods}, dispatch]= useStateContext();

    const listElements =  prods.productos.map((o)=>{
        let subdocument = o.colores || [{"color": "No disponible", "ide": Math.random()}];
        // let myData = this.props.myData || {}
        // console.log(subdocument);
        return (<li key={o._id} >{o.nombre} 
         <img className="product" src={blusas}/>
         <div className="flex">{subdocument.map((ob)=>
         <span style={{background : ob.cod_color}} key={ob.ide} onClick={() => { dispatch({ type: PRODUCT_SET_CURRENT, payload:{_id:o._id}}); history.push("/productos/one");}}>
         </span>)}</div>Lps. {o.precio}</li>);
    });
    useEffect(
        ()=>{
            dispatch({type: PRODUCT_INIT});
            dispatch({type: PRODUCT_LOADING})
            paxios.get('/api/productos/blusas')
            .then(({data})=>{
                dispatch({type:PRODUCT_LOADED, payload:data});
                console.log(data);
            })
            .catch((ex)=>{
                console.log(ex);
            });
        }
    ,[]);
    return (
        <Page headding="Blusas" footer={true}>
            <ul className="productoList">
                {listElements}
            </ul>
            <AddButton style={{position:"fixed", right:"1em", bottom:"6em"}} 
            onClick={(e)=>{history.push('/productos/new')}}>

            </AddButton>
        </Page>
    );
}
export default ListProductos;