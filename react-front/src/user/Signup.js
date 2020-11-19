// This file is for the signup page

import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";

class Signup extends Component {
    constructor() {
        super();
        //this state will have a couple of things--
        //we create a form here so that users can have the input and we can grab those input values--
        //and populate the state fields here .
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
            recaptcha: false
        };
    }
      //So as the input field will have the user input, as the input changes on that end,
       // those changes are available in the event as the event target value.
        // here, it can be any input other than name also
    handleChange = name => event => {
        this.setState({ error: "" }); // whenever there is something happening in the input field we clear the old errors.
        this.setState({ [name]: event.target.value });
    };

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    //So when submit button is clicked we would like to execute a method that will take all the data we have-
       // --in the state and make a POST request to the backend
    clickSubmit = event => {        // this will be responsible for handling when Submit button is clicked
        event.preventDefault();  // prevent the default behaviour of browser(eg- reload here)
        const { name, email, password } = this.state;  // destructuring
        // Creating a new user
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(data => {
                //Whatever error we got from the response we will post that to the states so that we can display it to the users
                if (data.error) this.setState({ error: data.error });
                else
                //So once we create a new user and everything went right then we need to clear the old values.
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true// if open is true then user will be able to see the success message
                    });
            });
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };
     // Form with couple of input fields
    signupForm = (name, email, password, recaptcha) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}  // using onChange to grab the value when any change occurs in the input field
                    type="text"
                    className="form-control"
                    value={name}  // To sync the input fields and handleChange event
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control"
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    );

    render() {
        // error => for Displaying any error or success message using conditional renderring
        // also displaying welcome message when new user account is created
        // accessing data from the state to pass it to the signupform method
        const { name, email, password, error, open, recaptcha } = this.state;  //destructuring
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <hr />
                <SocialLogin />

                <hr />
                <br />
                
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info"
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin">Sign In</Link>.
                </div>

                {this.signupForm(name, email, password, recaptcha)}
            </div>
        );
    }
}

export default Signup;
