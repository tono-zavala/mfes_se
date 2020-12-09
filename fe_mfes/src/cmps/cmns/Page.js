import "./Page.css";
import Header from './Header';
const Page = ({children, headding})=>{
    return(
        <section className="page">
            {(headding && true? (<Header>{headding}</Header>):null)}
            {children}
        </section>
    );
}

export default Page;