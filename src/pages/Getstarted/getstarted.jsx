import { IonButton, IonContent, IonPage } from "@ionic/react"
import './getstarted.css'

const GetStarted = () => {
  return (
    <IonPage>
        <IonContent className="getstarted-maindiv">

            <IonButton color="light" className="getstarted-div" routerLink="/login">Get Started</IonButton>
        </IonContent>
    </IonPage>
  )
}

export default GetStarted