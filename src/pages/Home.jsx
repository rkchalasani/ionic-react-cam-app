import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { chatbox, home, settingsSharp } from "ionicons/icons";
import Friends from "./Home/Friends/friends";
import Feed from "./Home/Feed/Feed";
import Settings from "./Home/Settings/settings";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login/Login";
import "./Home.css";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "./Home/Feed/Profile/profile";

const Home = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home/feed">
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            </Route>
            <Route path="/home/friends">
              <ProtectedRoute>
                <Friends />
              </ProtectedRoute>
            </Route>
            <Route path="/home/settings">
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </Route>
            <Route exact path="/home">
              <Redirect to="/home/tab1" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </IonRouterOutlet>
          <IonTabBar className="tabbar-div" slot="bottom" color="darkgreen">
            <IonTabButton tab="tab1" href="/home/feed">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/home/friends">
              <IonIcon icon={chatbox} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/home/settings">
              <IonIcon icon={settingsSharp} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
