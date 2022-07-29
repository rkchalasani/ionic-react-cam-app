import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Getstarted from "./pages/Getstarted/getstarted";
import "./theme/variables.css";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Friends from "./pages/Home/Friends/friends";
import Feed from "./pages/Home/Feed/Feed";
import Settings from "./pages/Home/Settings/settings";
import Profilepage from "./pages/Home/Profile/UserAccount";
import { doc, getDoc } from "firebase/firestore";
import { App as app } from "@capacitor/app";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { Browser } from "@capacitor/browser";
import UserProfile from "./pages/Home/Friends/userprofile/UserProfile";
import OneSignal from "onesignal-cordova-plugin";
import PostUsers from "./pages/Home/Feed/post/PostUsers/PostUsers";

setupIonicReact();

const App = () => {
  const [updateDetails, setUpdateDetails] = useState({});
  const [appVersion, setAppVersion] = useState("");
  const [show, dismiss] = useIonLoading();
  const updateRef = doc(db, "chatify_by_PTG", "dtvG3X4CjLV7CXMIRPES");
  const [presentAlert] = useIonAlert();
  const handleAlert = (message, title, button, appVersion) => {
    presentAlert({
      header: title,
      subHeader: `Version: ${appVersion}`,
      message: message,
      buttons: [
        {
          text: button,
          role: "Download",
          handler: async () => {
            show({
              message: "Please wait...",
              duration: 2000,
              spinner: "circular",
              cssClass: "lp-sp-spinner",
              animated: true,
              keyboardClose: true,
              mode: "ios",
            });
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.chatify.app",
            });
            dismiss();
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
    });
  };
  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };
  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUpdateDetails(data.updatemsg);
      setAppVersion(data.current);
    } else {
      // console.log("No such document!");
    }
  };
  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const message = updateDetails.message;
          const title = updateDetails.title;
          const button = updateDetails.button;
          handleAlert(message, title, button, appVersion);
        }
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    getConfigData();
    if (isPlatform("android")) {
      getAppInfo();
    }
    try {
      if (isPlatform !== "web") {
        OneSignalInit();
      }
    } catch (error) {
      console.log(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const OneSignalInit = () => {
    OneSignal.setAppId("6ebf500f-f48c-476e-be40-d8b5d1a2194e");
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
    });
  };

  checkUpdate();
  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home/feed">
              <Feed />
            </Route>
            <Route path="/home/friends">
              <Friends />
            </Route>
            <Route path="/home/settings">
              <Settings />
            </Route>
            <Route path="/userprofile/:id">
              <UserProfile />
            </Route>
            <Route path="/PostUsers/:id">
              <PostUsers />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/getstarted">
              <Getstarted />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/home/profile">
              <Profilepage />
            </Route>
            <Route exact path="/">
              <Redirect to="/getstarted" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
