import './Header.css';
const Header = ({children}) =>{
    return (
        <header className="header">
            <h1>{children}</h1>
        </header>
    );
}
export default Header;