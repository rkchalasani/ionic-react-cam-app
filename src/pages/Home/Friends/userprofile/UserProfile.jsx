import "./UserProfile.css";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../../../firebase";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import {
  bookmarksOutline,
  checkmarkCircleOutline,
  cloudUpload,
  heartOutline,
} from "ionicons/icons";
import { useParams } from "react-router";
import { UserAuth } from "../../../../context/AuthContext";

const UserProfile = () => {
  const { post } = UserAuth();
  const openLiked = () => {
    console.log("liked posts");
  };
  const openSaved = () => {
    console.log("saved posts");
  };
  const { id } = useParams;

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < post.length; i++) {
      if (post[i].uid === id) {
        return (data = post[i]);
      }
    }
    console.log(data)
    return data;

  };

  const usersData = getUserData();
  console.log(usersData);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="darkgreen">
            <IonRow className="search-row">
              <IonCol className="friends-col">
                <IonLabel className="frnds" color="smoke">
                  My Profile
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent className="profile-content">
          <IonRow className="pro-row">
            <IonAvatar className="avatar-img">
              <IonImg
                src={
                  usersData.photoURL
                    ? usersData.photoURL
                    : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                }
              ></IonImg>
            </IonAvatar>
          </IonRow>

          <IonRow className="name-col">
            <IonLabel color="smoke">{usersData.email}</IonLabel>
            <IonLabel className="font" color="smoke">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              quasi quae nihil ad, est excepturi ipsam! Voluptatum a obcaecati
              laboriosam, similique quae incidunt culpa. Esse unde aliquam
              blanditiis in suscipit.
            </IonLabel>
          </IonRow>

          <IonGrid className="grid">
            <IonLabel color="smoke">My Posts</IonLabel>
            <IonRow className="email-row1">
              {/* {post.map((currentUser) => {
                      return auth.currentUser.email === currentUser.email ? (
                        <>
                          {currentUser.img ? (
                            <IonAvatar className="my-posts-avatar">
                              <IonImg src={currentUser.img}></IonImg>
                            </IonAvatar>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      );
                    })} */}
            </IonRow>
            <IonRow onClick={openLiked} className="likedposts-row">
              <IonIcon color="light" icon={heartOutline}></IonIcon>
              <IonLabel color="smoke">Liked Posts</IonLabel>
            </IonRow>
            <IonRow onClick={openSaved} className="savedposts-row">
              <IonIcon color="light" icon={bookmarksOutline}></IonIcon>
              <IonLabel color="smoke">Saved Posts</IonLabel>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default UserProfile;
