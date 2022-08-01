import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { add, addCircle, chevronForwardOutline } from "ionicons/icons";
import { auth, db } from "../../../../firebase";

const Users = (props) => {
  const router = useIonRouter();
  const { id, photoURL, name, email, follow } = props;
  const openUserProfile = () => {
    router.push(`/userprofile/${id}`);
  };
  const likesRef = doc(db, "users", id);
  const handleFollow = () => {
    if (follow?.includes(auth.currentUser.email)) {
      updateDoc(likesRef, {
        follow: arrayRemove(auth.currentUser.email),
      })
        .then(() => {
          console.log("unfollowed");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        follow: arrayUnion(auth.currentUser.email),
      })
        .then(() => {
          console.log("followed");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <IonRow className="danni-row">
      <IonCard color="black" className="danni-card" key={id}>
        <IonCol className="frnds-col">
          <IonAvatar className="img-avatar">
            <IonImg
              src={
                photoURL
                  ? photoURL
                  : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
            ></IonImg>
          </IonAvatar>
          <IonCol
            onClick={() => {
              openUserProfile(id);
            }}
            className="col1"
          >
            <IonLabel
              style={{ marginTop: "15px", fontSize: "15px" }}
              color="smoke"
              className="danni-label"
            >
              {name}
            </IonLabel>
            <IonLabel color="smoke" className="danni-label">
              {email}
            </IonLabel>
          </IonCol>
        </IonCol>
        <IonCol>
          <IonRow
            style={{
              display: "flex",
              paddingBottom: "15px",
              fontSize: "15px",
              justifyContent: "center",
            }}
          >
            <IonLabel>{follow?.length} Followers</IonLabel>
          </IonRow>
          <IonRow style={{ display: "flex", justifyContent: "center" }}>
            {follow?.includes(auth.currentUser.email) ? (
              <IonButton
                color="lightblack ion-text-capitalize"
                style={{ width: 60, fontSize: "10px", height: 27 }}
                onClick={handleFollow}
              >
                UnFollow
              </IonButton>
            ) : (
              <IonButton
                color="smoke ion-text-capitalize"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 70,
                  fontSize: "10px",
                  height: 27,
                }}
                onClick={handleFollow}
              >
                <IonIcon icon={add} style={{ width: 40, height: 40 }}></IonIcon>
                Follow
              </IonButton>
            )}
          </IonRow>
        </IonCol>
      </IonCard>
    </IonRow>
  );
};
export default Users;
