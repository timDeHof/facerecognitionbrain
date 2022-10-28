import React, { Component } from "react";
import Navigation from "./components/navigation/navigation.component";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm.component";
import Logo from "./components/logo/logo.component";
import FaceRecognition from "./components/faceRecognition/faceRecognition.component";
import Rank from "./components/rank/rank.component";
import Signin from "./components/signin/signin.component";
import Register from "./components/register/register.component";
import ParticlesBg from "particles-bg";
import "./App.css";
const Clarifai = require("clarifai");

// const app = new Clarifai.App({
//   apiKey: "6e4384214c4f4cdaad62e4675139df7e",
// });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false,
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.input });
    // app.models
    //   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //   .then((response) =>
    //     this.displayFaceBox(this.calculateFaceLocation(response))
    //   )
    //   .catch((err) => console.log(err));
  };
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg
          className='particles'
          color='#ffffff'
          num={300}
          type='cobweb'
          bg={true}
        />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
