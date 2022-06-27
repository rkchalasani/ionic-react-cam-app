import { IonButton, IonPage } from "@ionic/react"


const Signup = () => {
  return (
    <IonPage>
        <IonButton routerLink="/home">
            Signup
        </IonButton>
        already have an account <IonButton routerLink="/login">login</IonButton>
    </IonPage>
  )
}

export default Signup