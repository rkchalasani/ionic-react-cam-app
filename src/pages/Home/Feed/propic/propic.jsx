import {
  IonAvatar,
  IonButton,
  IonCol,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonRow,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { updateProfile } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import {
  arrowBack,
  checkmarkCircleOutline,
  closeCircleOutline,
  ellipsisVertical,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import { auth, db } from "../../../../firebase";
// import propic

const propic = () => {
  const { user } = UserAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(
    db,
    "profile",
    // auth.currentUser.uid,
    // "profile"
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    // <IonImg src={user.img}>
    // </IonImg>
    <>
     {users.map((currentUser) => {
            return <IonImg className="post" src={currentUser.img}></IonImg>;
          })}
    </>
  );
};

export default propic;
