import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
// import Tab1 from './pages/Home/Hometab/Tab1';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Getstarted from './pages/Getstarted/getstarted';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { AuthContextProvider } from "./context/AuthContext";
import Tab1 from './pages/Home/Feed/Tab1';
import Tab2 from './pages/Home/Chat/Tab2';
import Tab3 from './pages/Home/Contacts/Tab3';
setupIonicReact();

const App = () => (
  <IonApp>
          <AuthContextProvider>
    <IonReactRouter>
   
        <IonRouterOutlet>
        <Route exact path="/home/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/home/tab2">
              <Tab2 />
            </Route>
            <Route path="/home/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/home">
              <Redirect to="/home/tab1" />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/getstarted">
            <Getstarted/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/">
             <Redirect to="/getstarted" />
          </Route>
        </IonRouterOutlet>
       
    </IonReactRouter>
    </AuthContextProvider>
  </IonApp>
);

export default App;
