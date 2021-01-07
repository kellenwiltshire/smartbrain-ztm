import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }
    render() {
        return (
            <div className="flex justify-center mt-24">
                <div className="w-1/2 shadow-2xl flex items-center justify-center bg-white rounded py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-photo" width="150" height="150" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <line x1="15" y1="8" x2="15.01" y2="8" />
                                <rect x="4" y="4" width="16" height="16" rx="3" />
                                <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
                                <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
                            </svg>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Register
                            </h2>
                        </div>
                    <div className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input 
                                        id="name" 
                                        name="name" 
                                        type="text" 
                                        required 
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                        placeholder="Name"
                                        onChange={this.onNameChange}
                                         />
                                </div>
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input 
                                        id="email-address" 
                                        name="email" 
                                        type="email" 
                                        autoComplete="email" 
                                        required 
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                        placeholder="Email address"
                                        onChange={this.onEmailChange} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        autoComplete="current-password" 
                                        required 
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                        placeholder="Password" 
                                        onChange={this.onPasswordChange}
                                        />
                                </div>
                            </div>
    
                            <div>
                                <button type="submit" onClick={this.onSubmitSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
}

export default Register;