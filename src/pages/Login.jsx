import { IonButton, IonPage } from "@ionic/react"


const Login = () => {
  return (
    <IonPage className="login-main-div">

        <IonButton 
         routerLink="/home">
            Login
        </IonButton>
        
        <br />
        dont have account? <IonButton routerLink="/signup">Signup</IonButton>
    </IonPage>
  )
}

export default Login