import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, peopleSharp, person, settingsSharp } from "ionicons/icons";
import Friends from "./Home/Friends/friends";
import Feed from "./Home/Feed/Feed";
import Settings from "./Home/Settings/settings";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login/Login";
import "./Home.css";
import ProtectedRoute from "../components/ProtectedRoute";
import Profilepage from "./Home/Profile/UserAccount";
import UserProfile from "./Home/Friends/userprofile/UserProfile";
import PostUsers from "./Home/Feed/post/PostUsers/PostUsers";
import FullPost from "./Home/Feed/post/FullPost/FullPost";
import PrivacyPolicy from "./Home/Settings/privacypolicy/PrivacyPolicy";

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
            <Route path="/privacypolicy">
              <PrivacyPolicy />
            </Route>
            <Route path="/home/settings">
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </Route>
            <Route exact path="/home">
              <Redirect to="/home/feed" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home/profile">
              <Profilepage />
            </Route>
            <Route path="/userprofile/:id">
              <UserProfile />
            </Route>
            <Route path="/PostUsers/:id">
              <PostUsers />
            </Route>
            <Route path="/FullPost/:id">
              <FullPost />
            </Route>
          </IonRouterOutlet>
          <IonTabBar className="tabbar-div" slot="bottom" color="black">
            <IonTabButton tab="tab1" href="/home/feed">
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/home/friends">
              <IonIcon icon={peopleSharp} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/home/profile">
              <IonIcon icon={person} />
            </IonTabButton>
            <IonTabButton tab="tab4" href="/home/settings">
              <IonIcon icon={settingsSharp} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
