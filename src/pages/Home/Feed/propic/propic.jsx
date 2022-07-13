import { IonAvatar, IonButton, IonIcon, IonImg, IonInput, IonLabel, IonRow, useIonAlert, useIonRouter } from "@ionic/react";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { arrowBack, checkmarkCircleOutline, closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import { auth, db } from "../../../../firebase";


const propic = () => {
    const { user } = UserAuth();
    const user_id = user.uid;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [uname, setUname] = useState(user.displayName);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isUpdate, setIsUpdate] = useState(false);
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let router = useIonRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [presentAlert] = useIonAlert();
  
    const handleAlert = async (msg) => {
      presentAlert({
        header: "Alert",
        message: msg,
        buttons: ["OK"],
        backdropDismiss: true,
        translucent: true,
        animated: true,
        cssClass: "lp-sp-alert",
      });
    };
    const handleUpdate = async () => {
      const userRef = doc(db, "profile", auth.currentUser.uid, "posts");
  
      try {
        await updateProfile(auth.currentUser, {
          displayName: uname,
        })
          .then(() => {
            console.log(auth.currentUser.displayName);
          })
          .catch((error) => {
            handleAlert(error.message);
          });
  
        await updateDoc(userRef, {
          name: uname,
        });
  
        setIsUpdate(false);
      } catch (error) {
        handleAlert(error.message);
      }
    };
  
    const toggleUpdate = () => {
      setIsUpdate(true);
    };
    const cancelUpdate = () => {
      setIsUpdate(false);
    };
  
    const handleBack = () => {
      router.push("/home/chats");
    };
  return (
    <IonImg src={user.img}>
        
    </IonImg>

  
  )
}

export default propic