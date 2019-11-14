import React, { Component } from 'react';
import { userService } from '../services/user.service';
import Button from '@material-ui/core/Button';
import Spinner from 'react-bootstrap/Spinner'

class Login extends Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(e) {
        const { name, value } = e.target;
        console.log(name + " " + value);
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        if (!(username && password)) {
            this.setState({ error:"Fields cannot be empty", loading: false })
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render () {
        const { username, password, submitted, loading, error } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <div className="alert alert-info">
                    Username: test<br />
                    Password: test
                </div>
                <h2>Login</h2>
                <hr/>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        {!loading &&
                            <button variant="contained" color="primary" disabled={loading} className="btn btn-primary">Login</button>
                        }
                        {loading &&
                            <Button variant="primary" disabled>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"/>
                            Loading...
                          </Button>
                        }
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
            </div>
        )
    }
}

export default Login;