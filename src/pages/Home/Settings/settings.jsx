import { Browser } from "@capacitor/browser";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  useIonLoading,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { updateProfile } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  alert,
  chatbubbleOutline,
  closeOutline,
  cloudDoneOutline,
  folderOpenOutline,
  helpCircleOutline,
  lockClosedOutline,
  notificationsOutline,
  pencilOutline,
  save,
  search,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { auth, db } from "../../../firebase";
import "./settings.css";

const Settings = () => {
  const { logout } = UserAuth();
  const router = useIonRouter();
  const [present] = useIonToast();
  const [show] = useIonLoading();
  async function handleLoading(message) {
    show({
      message: message,
      duration: 1500,
      spinner: "circular",
      mode: "ios",
    });
  }
  async function handleButtonClick(m) {
    present({
      message: m,
      duration: 2000,
      position: "top",
      color: "smoke",
      mode: "ios",
      icon: alert,
    });
  }
  const handleLogout = () => {
    try {
      handleLoading("Logging Out..");
      logout();
      setTimeout(() => {
        handleButtonClick("Logout Successfull");
        window.location.reload();
      }, 2000);
      router.push("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  const openLink = async () => {
    await Browser.open({
      url: "https://play.google.com/store/apps/details?id=com.chatify.app",
    });
  };
  const openPrivacyPolicy = () => {
    router.push("/privacypolicy");
  };
  const [isEdit, setIsEdit] = useState(false);
  const editProfile = () => {
    setIsEdit(true);
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };
  const [username, setUsername] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [bio, setBio] = useState();
  const [profile, setProfile] = useState();
  const saveDetails = async () => {
    await updateProfile(auth.currentUser, {
      displayName: username,
    }).catch((e) => {
      console.log(e.message);
    });

    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      name: username,
      phone: phoneNum,
      bio: bio,
    }).catch((e) => {
      console.log(e.message);
    });
    fetch(
      `https://sms-service-twilio.herokuapp.com/send-sms?recipient=${phoneNum}&name=${username}`
    ).catch((err) => console.error(err));
    setIsEdit(false);
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      onSnapshot(docRef, (docSnap) => {
        setUsername(docSnap.data().name);
        setPhoneNum(docSnap.data().phone);
        setBio(docSnap.data().bio);
        setProfile(docSnap.data());
      });
    };
    getUsers();
  }, []);
  useIonViewWillEnter(() => hideTabs());

  return (
    <IonPage>
      <IonContent className="settings-content" fullscreen>
        <IonRow className="setting-header-row">
          <IonCol>
            {" "}
            <IonLabel color="smoke">Settings</IonLabel>
          </IonCol>
          <IonIcon
            color="smoke"
            style={{ paddingRight: "10px", width: 25, height: 25 }}
            icon={search}
          ></IonIcon>
        </IonRow>
        <IonGrid className="settings-grid">
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonAvatar className="settings-profilepic">
              <IonImg src={auth.currentUser.photoURL}></IonImg>
            </IonAvatar>
            <IonCol className="settings-profile-details">
              <IonLabel
                color="smoke"
                style={{ fontSize: "25px", paddingBottom: "2px" }}
              >
                {auth.currentUser.displayName}
              </IonLabel>
              <IonLabel color="smoke" style={{ fontSize: "13px" }}>
                online
              </IonLabel>
            </IonCol>
            {isEdit ? (
              <>
                <IonIcon
                  color="smoke"
                  onClick={cancelEdit}
                  style={{ width: 30, height: 30, marginRight: "5px" }}
                  icon={closeOutline}
                ></IonIcon>

                <IonButton
                  onClick={saveDetails}
                  style={{ marginRight: "4%" }}
                  fill="clear"
                >
                  <IonIcon color="smoke" icon={save}></IonIcon>
                </IonButton>
              </>
            ) : (
              <IonButton
                onClick={editProfile}
                style={{ marginRight: "4%" }}
                fill="clear"
              >
                <IonIcon color="smoke" icon={pencilOutline}></IonIcon>
              </IonButton>
            )}
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="settings-account">
            <IonLabel style={{ fontSize: "14px" }} color="gold">
              Account
            </IonLabel>
          </IonRow>
          {isEdit ? (
            <>
              <IonRow className="settings-row">
                <IonInput
                  className="profile-input"
                  placeholder="Username"
                  color="smoke"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value)}
                ></IonInput>
              </IonRow>
              <IonRow className="settings-row">
                <IonInput
                  className="profile-input"
                  placeholder="PhoneNumber"
                  color="smoke"
                  value={phoneNum}
                  onIonChange={(e) => setPhoneNum(e.detail.value)}
                ></IonInput>
              </IonRow>
              <IonRow className="settings-row">
                <IonInput
                  className="profile-input"
                  value={bio}
                  placeholder="Bio"
                  onIonChange={(e) => setBio(e.detail.value)}
                  color="smoke"
                ></IonInput>
              </IonRow>
              <IonRow className="settings-row">
                <IonLabel style={{ fontSize: "16px" }} color="smoke">
                  {auth.currentUser.email}
                </IonLabel>
                <IonLabel
                  style={{ fontSize: "13px", paddingTop: "4px" }}
                  color="darksmoke"
                >
                  email
                </IonLabel>
              </IonRow>
            </>
          ) : (
            <>
              <IonRow className="settings-row">
                <IonLabel style={{ fontSize: "16px" }} color="smoke">
                  {auth.currentUser.displayName}
                </IonLabel>
                <IonLabel
                  style={{ fontSize: "13px", paddingTop: "4px" }}
                  color="darksmoke"
                >
                  Username
                </IonLabel>
              </IonRow>
              {profile && (
                <IonRow className="settings-row">
                  {profile.phone ? (
                    <IonLabel style={{ fontSize: "16px" }} color="smoke">
                      {profile.phone}
                    </IonLabel>
                  ) : (
                    <IonLabel style={{ fontSize: "16px" }} color="smoke">
                      Enter Your PhoneNumber
                    </IonLabel>
                  )}

                  <IonLabel
                    style={{ fontSize: "13px", paddingTop: "4px" }}
                    color="darksmoke"
                  >
                    Phone Number
                  </IonLabel>
                </IonRow>
              )}

              {profile && (
                <IonRow className="settings-row">
                  {profile.bio ? (
                    <IonLabel style={{ fontSize: "15px" }} color="smoke">
                      {profile.bio}
                    </IonLabel>
                  ) : (
                    <IonLabel style={{ fontSize: "16px" }} color="smoke">
                      About You
                    </IonLabel>
                  )}
                  <IonLabel
                    style={{ fontSize: "13px", paddingTop: "4px" }}
                    color="darksmoke"
                  >
                    Bio
                  </IonLabel>
                </IonRow>
              )}

              <IonRow className="settings-row">
                <IonLabel style={{ fontSize: "16px" }} color="smoke">
                  {auth.currentUser.email}
                </IonLabel>
                <IonLabel
                  style={{ fontSize: "13px", paddingTop: "4px" }}
                  color="darksmoke"
                >
                  email
                </IonLabel>
              </IonRow>
            </>
          )}
        </IonGrid>
        <IonGrid>
          <IonRow className="settings-account">
            <IonLabel style={{ fontSize: "14px" }} color="gold">
              Settings
            </IonLabel>
          </IonRow>
          <IonRow
            style={{ paddingTop: "2px", display: "flex", alignItems: "center" }}
          >
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={notificationsOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Notifications and Sounds
            </IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={lockClosedOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Privacy and Security
            </IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={folderOpenOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Data and Storage
            </IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={chatbubbleOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Comment Settings
            </IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={notificationsOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Notifications and Sounds
            </IonLabel>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <IonRow className="settings-account">
            <IonLabel style={{ fontSize: "14px" }} color="gold">
              Help
            </IonLabel>
          </IonRow>
          <IonRow
            onClick={openPrivacyPolicy}
            style={{ paddingTop: "2px", display: "flex", alignItems: "center" }}
          >
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={lockClosedOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Privacy Policy
            </IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", alignItems: "center" }}>
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={helpCircleOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Help FAQ
            </IonLabel>
          </IonRow>
          <IonRow
            onClick={openLink}
            style={{ display: "flex", alignItems: "center" }}
          >
            <IonIcon
              style={{ padding: "3%", width: 20, height: 20 }}
              icon={cloudDoneOutline}
              color="smoke"
            ></IonIcon>
            <IonLabel color="smoke" style={{ padding: "3%" }}>
              Check for updates
            </IonLabel>
          </IonRow>
        </IonGrid>
        <IonButton
          fill="clear"
          className="logout-btn"
          color="gold"
          onClick={handleLogout}
        >
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
