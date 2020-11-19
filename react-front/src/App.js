import React from "react";
import { BrowserRouter } from "react-router-dom";
// Browesr router will wrap all the other routes when we push the different routes from "/" to home,, or "/about" etc
// so all this will happen within the browser
// so browser router will be knowing which route is in the current state
import MainRouter from "./MainRouter";

const App = () => (
    <BrowserRouter>  
        <MainRouter />
    </BrowserRouter>
);

export default App;
