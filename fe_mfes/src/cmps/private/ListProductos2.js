import Page from '../cmns/Page';
import { AddButton } from '../cmns/Buttons';
import './ListProductos.css';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../utlts/Context';
import {paxios} from '../../utlts/Axios';

import {PRODUCT_LOADED, PRODUCT_LOADING, PRODUCT_INIT} from '../../utlts/store/reducers/prods.reducer';

const ListProductos = () =>{
    const[{prods}, dispatch]= useStateContext();

    const listElements =  prods.productos.map((o)=>{
        let subdocument = o.colores || [{"color": "No disponible", "ide": Math.random()}];
        // let myData = this.props.myData || {}
        // console.log(subdocument);
        return (<li key={o._id}>{o.nombre} {subdocument.map((ob)=><span key={ob.ide}>{ob.color}</span>)}</li>);
    })
    ;
    useEffect(
        ()=>{
            dispatch({type: PRODUCT_INIT});
            dispatch({type: PRODUCT_LOADING})
            paxios.get('/api/productos/jeans')
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
        <Page headding="Jeans" footer={true}>
            <ul className="productoList">
                {listElements}
            </ul>
            <AddButton style={{position:"fixed", right:"1em", bottom:"6em"}}></AddButton>
        </Page>
    );
}
export default ListProductos;