import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import History from './components/History/History'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Stats from './components/Stats/Stats'
import { React, Component } from 'react';
import Clarifai from 'clarifai';
import { api } from './api/api'

const app = new Clarifai.App({
  apiKey: api
});

// TODO - Fix Sign In/Register to respond to 'Enter' Button Press
// TODO - Add More Detection Options with drop-down expansion to include more stats available through Clarifai
// TODO - Add Profile Page that shows User stats and allows Profile Deletion
// TODO - Add Footer
// TODO - Login Error Detection and Response
// TODO - Add Home Route for Nav
// TODO - Make it Beautiful
class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [{}],
      celebrities: [{}],
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
    const clarifaiFace = data.region_info.bounding_box;
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
    this.setState({box: [box, ...this.state.box]})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  detectFaces = () => {
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
      this.setState({box: [{}]})
      for (let i = 0; i < response.outputs[0].data.regions.length; i++){
        this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[i]))
      }
    })
    .catch(err => console.log(err));
  }

  getCelebrities = (celebFace) => {
    const clarifaiCeleb = celebFace.data.concepts[0];
    const celeb = clarifaiCeleb.name;
    const accuracy = clarifaiCeleb.value * 100;
    const roundAccuracy = Math.round(accuracy);
    return{
      celeb: celeb,
      acc: roundAccuracy
    }    
  }

  setCelebrities = (data) => {
    if(!this.state.celebrities.length){
      this.setState({celebrities: [data]})
    } else {
      this.setState({celebrities: [data, ...this.state.celebrities]})
    }
    
  }

  detectCelebrities = () => {
    app.models.predict(
      Clarifai.CELEBRITY_MODEL, 
      this.state.input)
    .then(response => {
      this.setState({celebrities: [{}]})
      for (let i = 0; i < response.outputs[0].data.regions.length; i++){
        this.setCelebrities(this.getCelebrities(response.outputs[0].data.regions[i]))
      }
    })
    .catch(err => console.log(err));
  }

  onPictureSubmit = () => {

    if(this.state.input !== ''){
      this.setState({
        imageURL: this.state.input,
        historyList: [this.state.input, ...this.state.historyList],
        })
      
      this.detectFaces();
      this.detectCelebrities();

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
    const { isSignedIn, imageURL, route, box, historyList, celebrities } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <FaceRecognition box={box} imageURL={imageURL}/>
              <Stats box={box} celebrities={celebrities}/>
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
