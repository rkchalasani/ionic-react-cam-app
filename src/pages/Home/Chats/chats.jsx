// import React from 'react'
import { AppUpdate } from '@robingenz/capacitor-app-update';
import { IonButton, IonContent, IonLabel, IonPage, useIonAlert  } from "@ionic/react"
import axios from "axios";
import { useEffect, useState } from 'react';
// import { title } from 'process';
const chats = () => {

  const getCurrentAppVersion = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.currentVersion;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [presentAlert] = useIonAlert();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [updatedata, setUpdatedata] = useState()
  const url = "https://crudcrud.com/api/46ba4159071f453481de11bf081d32ee/konnect-app-config/62c6be906f047803e8aebed4";
  async function handleAlert(msg, title, btn) {
    presentAlert({
      header: title,
      message: msg,
      buttons: [btn],
      mode: "md",
      animated: true,
      cssClass: "loginpage-alert",
      color: "light",
    });
  }
  const getUrl = async ()=>{

      axios.get(
        url
      ).then((res)=>{
        const data = res.data;
        setUpdatedata(res.data.updateMsg);
        console.log(data.current);
      })

  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
      getUrl()
    }, [])
  const checkData=()=>{
    const msg = updatedata.msg;
    const title = updatedata.title;
    const btn = updatedata.btn;
    handleAlert(msg , title , btn)
  }


  return (
    <IonPage> 
        <IonContent>
           <IonLabel>Hello</IonLabel>
           <IonButton onClick={checkData}>Update</IonButton>
        </IonContent>
    </IonPage>
  )
}

export default chats