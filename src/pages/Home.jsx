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
import { callOutline, homeOutline, settingsOutline } from "ionicons/icons";
import Tab1 from "./Home/Feed/Tab1";
import Tab2 from "./Home/Chat/Tab2";
import Tab3 from "./Home/Contacts/Tab3";
import { Redirect, Route } from "react-router-dom";
import Login from "./Login/Login";
import './Home.css'

const Home = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
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
          </IonRouterOutlet>
          <IonTabBar className="tabbar-div" slot="bottom">
            <IonTabButton tab="tab1" href="/home/tab1">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/home/tab2">
              <IonIcon icon={callOutline} />
              <IonLabel>Calls</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/home/tab3">
              <IonIcon icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
