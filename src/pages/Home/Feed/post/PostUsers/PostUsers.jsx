// import "./UserProfile.css";
import {
  IonAvatar,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useParams } from "react-router";
import { UserAuth } from "../../../../../context/AuthContext";

const PostUsers = () => {
  const { mypost } = UserAuth();
  const { id } = useParams();
  const {userPosts} = UserAuth()


  const getUserData = () => {
    let data = {};
    for (var i = 0; i < userPosts.length; i++) {
      if (userPosts[i].id === id) {
        return (data = userPosts[i]);
      }
    }
    return data;
  };
  const router = useIonRouter();
  const goToUsers = () => {
    router.push("/home/feed");
  };
  const usersData = getUserData();

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="black">
            <IonRow className="search-row" style={{ paddingLeft: "17px" }}>
              <IonIcon icon={arrowBack} onClick={goToUsers}></IonIcon>
              <IonCol className="friends-col">
                <IonLabel className="frnds" color="smoke">
                  {usersData.name}
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
            <IonLabel color="smoke" style={{ paddingTop: "20px" }}>
              {usersData.email}
            </IonLabel>
            {/* <IonLabel className="font" color="smoke">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              quasi quae nihil ad, est excepturi ipsam! Voluptatum a obcaecati
              laboriosam, similique quae incidunt culpa. Esse unde aliquam
              blanditiis in suscipit.
            </IonLabel> */}
          </IonRow>

          <IonCard className="user-posts-card" color="black">
            <IonRow style={{ padding: "4%", fontSize: "20px" }}>
              <IonLabel color="smoke">Posts by {usersData.name}</IonLabel>
            </IonRow>
            {mypost ? (
              <IonRow className="user-posts-row">
                {mypost.map((currentUser) => {
                  return (
                    <>
                      {currentUser.email === usersData.email ? (
                        <>
                          {currentUser.img ? (
                            <IonAvatar
                              key={currentUser.id}
                              style={{ width: "29vw", height: "15vh" }}
                              className="user-posts-avatar"
                            >
                              <IonImg src={currentUser.img}></IonImg>
                            </IonAvatar>
                          ) : (
                            <></>
                          )}
                        </>
                       ) : (
                        <></>
                      )} 
                    </>
                  );
                })}
              </IonRow>
            ) : (
              <IonRow style={{ display: "flex" }}>
                <IonLabel color="smoke">No posts available</IonLabel>
              </IonRow>
            )}
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PostUsers;
