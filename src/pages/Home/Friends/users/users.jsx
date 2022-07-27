import {
  IonAvatar,
  IonCol,
  IonIcon,
  IonImg,
  IonLabel,
  IonRow,
  useIonRouter,
} from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

const Users = (props) => {
  const router = useIonRouter();
  const { id, photoURL, name, email } = props;
  const openUserProfile = (id) => {
    router.push(`/userprofile/${id}`);
  };

  return (
    <IonRow
      className="danni-row"
      key={id}
      onClick={() => {
        openUserProfile(id);
      }}
    >
      <IonAvatar className="img-avatar">
        <IonImg
          src={
            photoURL
              ? photoURL
              : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
          }
        ></IonImg>
      </IonAvatar>
      <IonCol className="col1">
        <IonLabel color="smoke" className="danni-label">
          {name}
        </IonLabel>
        <IonLabel color="smoke" className="danni-label">
          {email}
        </IonLabel>
      </IonCol>
      <IonLabel color="smoke" className="danni-label">
        <IonIcon
          style={{ height: 23, width: 23 }}
          icon={chevronForwardOutline}
        ></IonIcon>
      </IonLabel>
    </IonRow>
  );
};
export default Users;
