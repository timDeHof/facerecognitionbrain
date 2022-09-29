import "./App.css";
import Navigation from "./components/navigation/navigation.component";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm.component";
import Logo from "./components/logo/logo.component";
import FaceRecognition from "./components/faceRecognition/faceRecognition.component";
import Rank from "./components/rank/rank.component";
import ParticlesBg from "particles-bg";

function App() {
  return (
    <div className='App'>
      <ParticlesBg
        className='particles'
        color='#ffffff'
        num={500}
        type='cobweb'
        bg={true}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      <FaceRecognition />
    </div>
  );
}

export default App;
