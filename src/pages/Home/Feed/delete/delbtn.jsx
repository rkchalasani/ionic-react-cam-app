// import React from 'react'

import { IonButton, IonIcon, IonRow } from "@ionic/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { trash, trashBin, trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";

const delbtn = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    // window.location.reload();
    console.log("clicked");
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "user");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  
  return (
    <IonRow>
      {users.map((currentUser) => {
        return (
          <IonButton
            color="lightgreen"
            onClick={() => {
              deleteUser(currentUser.id);
            }}
          >
            <IonIcon icon={trashOutline}></IonIcon>
          </IonButton>
        );
      })}
    </IonRow>
  );
};

export default delbtn;
