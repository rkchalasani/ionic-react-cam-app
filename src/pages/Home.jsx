import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRedirect,
  IonRoute,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  albums,
  call,
  chatbox,
  home,
  homeSharp,
  settings,
  settingsSharp,
} from "ionicons/icons";
import Tab1 from "./Home/HomeChats/Tab1";
import Tab2 from "./Home/Feed/Tab2";
import Tab3 from "./Home/Settings/Tab3";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login/Login";
import Chats from "./Home/Chats/chats";
import "./Home.css";
import Newuser from "./Home/Feed/new/Newuser";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "./Home/Feed/posts/profile";

const Home = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home/tab1">
              <ProtectedRoute>
                <Tab2 />
              </ProtectedRoute>
            </Route>
            <Route path="/home/tab2">
              <ProtectedRoute>
                <Tab1 />
              </ProtectedRoute>
            </Route>
            <Route path="/home/tab3">
              <ProtectedRoute>
                <Tab3 />
              </ProtectedRoute>
            </Route>
            <Route exact path="/home">
              <Redirect to="/home/tab1" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/new">
              <Newuser />
            </Route>
            <Route path="/profile">
            <Profile />
          </Route>
          </IonRouterOutlet>
          <IonTabBar className="tabbar-div" slot="bottom" color="darkgreen">
          <IonTabButton tab="tab2" href="/home/tab1">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="tab1" href="/home/tab2">
              <IonIcon icon={chatbox} />
            </IonTabButton>         
            <IonTabButton tab="tab3" href="/home/tab3">
              <IonIcon icon={settingsSharp} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
