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
  useIonViewWillEnter,
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
  const usersCollectionRef = collection(db, "users",
  //  auth.currentUser.uid
   );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useIonRouter();
  const openProfile = () => {
    router.push("/profile");
  };
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
    <>
      {users.map((currentUser) => {
        return (
          <IonImg
          onClick={openProfile}
          // style={{ height: 23, width: 23 }}
          className=""
          src={currentUser.photoURL}
        ></IonImg>
        );
      })}
    </>
  );
};

export default propic;
