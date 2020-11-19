import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    // we don't need to send the bearer token while req to backend in this one because this is accessible for everyone.
    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }
      // Rendering all users
    renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (
                // Styling users' card
                <div className="card col-md-4" key={i}>
                    <img
                        style={{ height: "200px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        //loop through all the uses from the state and render them here
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
