import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import History from './components/History/History'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import { React, Component } from 'react';
import Clarifai from 'clarifai';
import { api } from './api/api'

const app = new Clarifai.App({
  apiKey: api
});

const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  }
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      historyList: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  })

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height), 

      height: height + 10
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {

    if(this.state.input !== ''){
      this.setState({
        imageURL: this.state.input,
        historyList: [this.state.input, ...this.state.historyList],
        })
  
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
    } 

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  deleteHistory = () => {
    const Arr = [];
    this.setState({historyList: Arr});
  }

  render(){
    const { isSignedIn, imageURL, route, box, historyList } = this.state;
    return (
      <div className="App bg-blue-900">
        {/* <Particles className="fixed inset-0 -z-1 bg-blue-900"
                params={particlesOptions}
              /> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <FaceRecognition box={box} imageURL={imageURL}/>
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
              <History historyList={historyList} deleteHistory={this.deleteHistory} />
            </div>
          : ( route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
