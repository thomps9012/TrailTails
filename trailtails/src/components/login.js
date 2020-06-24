import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import '../styles/homePage.css';

function login() {
    return(
    <Router>
    <form>
        <div id= 'login' class="form-row align-items-center">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInput">Username</label>
                <input type="text" class="form-control mb-2" id="inlineFormInput" placeholder="Username"></input>
            </div>
                <div class="col-auto">
                    <div class="input-group mb-2">
                        <div class="input-group-prepend">
                        </div>
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Password"></input>
                    </div>
                </div>
                    <div class="col-auto">
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="autoSizingCheck"></input>
                                <label class="form-check-label" for="autoSizingCheck"> Remember me</label>
                        </div>
                    </div>
                        <div class="col-auto">
                            <Link to="/userProfile"><button type="submit" class="btn btn-primary mb-2">Submit</button></Link>
                        </div>
        </div>
    </form>
    </Router>
    );
}

export default login;