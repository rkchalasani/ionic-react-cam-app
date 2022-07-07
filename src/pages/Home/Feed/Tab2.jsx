import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  add,
  addCircleSharp,
  bookmark,
  chatbubble,
  ellipsisVertical,
  heart,
  menu,
  search,
} from "ionicons/icons";
import { useState } from "react";
// import ExploreContainer from '../components/ExploreContainer';
import "./Tab2.css";
import { storage } from "../../../firebase";

const Tab2 = () => {
  return (
    <IonPage>
      <IonContent className="feed-content" fullscreen>
        <IonRow className="search-row">
          <IonCol>
            {" "}
            <IonLabel color='smoke'>Feed</IonLabel>
          </IonCol>
          <IonIcon icon={addCircleSharp}></IonIcon>
        </IonRow>
        <IonGrid className="feed-grid">
          <IonCard className="feed-card" color="darkgreen">
            <IonRow className="danni-row">
              <IonImg
                className="danni-img"
                src="assets/images/pro7.jpg"
              ></IonImg>
              <IonCol className="col1">
                <IonLabel color="smoke" className="danni-label">
                  Danni Hopkins
                </IonLabel>
                <IonLabel color="smoke" className="danni-label">
                  @dannihopkins717
                </IonLabel>
              </IonCol>
              <IonIcon
                className="menu-icon"
                color="light"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonImg src="assets/images/img9.jpg"></IonImg>
            <IonRow>
              <IonIcon className="heart-icon" icon={heart}></IonIcon>
              <IonIcon className="comment-icon" icon={chatbubble}></IonIcon>
              <IonCol className="icon-col">
                <IonIcon className="comment-icon" icon={bookmark}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard className="feed-card" color="darkgreen">
            <IonRow className="danni-row">
              <IonImg
                className="danni-img"
                src="assets/images/pro7.jpg"
              ></IonImg>
              <IonCol className="col1">
                <IonLabel color="smoke" className="danni-label">
                  Danni Hopkins
                </IonLabel>
                <IonLabel color="smoke" className="danni-label">
                  @dannihopkins717
                </IonLabel>
              </IonCol>
              <IonIcon
                className="menu-icon"
                color="light"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonImg src="assets/images/lens1.jpg"></IonImg>
            <IonRow>
              <IonIcon className="heart-icon" icon={heart}></IonIcon>
              <IonIcon className="comment-icon" icon={chatbubble}></IonIcon>
              <IonCol className="icon-col">
                <IonIcon className="comment-icon" icon={bookmark}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard className="feed-card" color="darkgreen">
            <IonRow className="danni-row">
              <IonImg
                className="danni-img"
                src="assets/images/pro3.jpg"
              ></IonImg>
              <IonCol className="col1">
                <IonLabel color="smoke" className="danni-label">
                  Danni Hopkins
                </IonLabel>
                <IonLabel color="smoke" className="danni-label">
                  @dannihopkins717
                </IonLabel>
              </IonCol>
              <IonIcon
                className="menu-icon"
                color="light"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonImg src="assets/images/img9.jpg"></IonImg>
            <IonRow>
              <IonIcon className="heart-icon" icon={heart}></IonIcon>
              <IonIcon className="comment-icon" icon={chatbubble}></IonIcon>
              <IonCol className="icon-col">
                <IonIcon className="comment-icon" icon={bookmark}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCard>
          <IonCard className="feed-card" color="darkgreen">
            <IonRow className="danni-row">
              <IonImg
                className="danni-img"
                src="assets/images/pro7.jpg"
              ></IonImg>
              <IonCol className="col1">
                <IonLabel color="smoke" className="danni-label">
                  Danni Hopkins
                </IonLabel>
                <IonLabel color="smoke" className="danni-label">
                  @dannihopkins717
                </IonLabel>
              </IonCol>
              <IonIcon
                className="menu-icon"
                color="light"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonImg src="assets/images/img9.jpg"></IonImg>
            <IonRow>
              <IonIcon className="heart-icon" icon={heart}></IonIcon>
              <IonIcon className="comment-icon" icon={chatbubble}></IonIcon>
              <IonCol className="icon-col">
                <IonIcon className="comment-icon" icon={bookmark}></IonIcon>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
