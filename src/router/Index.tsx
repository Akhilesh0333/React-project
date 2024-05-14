import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "../component/user/User";


const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<User />} />
            </Routes>
        </Router>
    )
}

export default Index
