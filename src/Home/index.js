import useAuth from "../hooks/useAuth";
import CarList from "../Car/CarList";


const Home = () =>{
    const {auth} = useAuth();
    if(!auth.accessToken)
        localStorage.removeItem("user");
    return(
        <div>
            <CarList/>
        </div>
    )
}

export default Home;