import Page from '../cmns/Page';
import { AddButton } from '../cmns/Buttons';
import './ListProductos.css';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../utlts/Context';
import {paxios} from '../../utlts/Axios';

const dummyData = [
    {"_id": 1,"label":"contenido 1","count":1},
    {"_id": 2,"label":"contenido 2","count":2},
    {"_id": 3,"label":"contenido 3","count":3},
    {"_id": 4,"label":"contenido 4","count":4},
    {"_id": 5,"label":"contenido 5","count":5},
    {"_id": 6,"label":"contenido 6","count":6},
    {"_id": 7,"label":"contenido 7","count":7},
    {"_id": 8,"label":"contenido 8","count":8},
    {"_id": 9,"label":"contenido 9","count":9},
    {"_id": 10,"label":"contenido 10","count":10},
    {"_id": 11,"label":"contenido 11","count":11},
    {"_id": 12,"label":"contenido 12","count":12},
    {"_id": 13,"label":"contenido 13","count":13},
    {"_id": 14,"label":"contenido 14","count":14},
    {"_id": 15,"label":"contenido 15","count":15},
    {"_id": 16,"label":"contenido 16","count":16},
];

const ListProductos = () =>{
    const[{prods}, dispath]= useStateContext();

    const listElements = dummyData.map((o)=>{
        return (<li key={o._id}>{o.label} <span>{o.count}</span></li>);
    })
    useEffect(
        ()=>{
            paxios.get('/api/productos/blusas')
            .then(({data})=>{
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
            <AddButton style={{position:"fixed", right:"1em", bottom:"6em"}}></AddButton>
        </Page>
    );
}
export default ListProductos;