import {Link,useNavigate} from "react-router-dom"

const Navbar=()=>{
return(
    <>
    <nav>
    <li class="nav-item">
          <Link class="nav-link" to="/">formData</Link>
          <Link class="nav-link" to="/table">showTable</Link>

        </li>
        {/* <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a> */}
    </nav>
    </>
)
}
export default Navbar;