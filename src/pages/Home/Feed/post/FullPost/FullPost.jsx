import "./FullPost.css";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonAlert,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  arrowBack,
  bookmark,
  bookmarkOutline,
  chatbubbleOutline,
  ellipsisVertical,
  heart,
  heartOutline,
  send,
  shareOutline,
  trash,
} from "ionicons/icons";
import { useParams } from "react-router";
import { UserAuth } from "../../../../../context/AuthContext";
import { auth, db } from "../../../../../firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Share } from "@capacitor/share";
import Moment from "react-moment";

const FullPost = (props) => {
  const { posts } = UserAuth();

  const { id } = useParams();

  const getUserData = () => {
    let data = {};
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
        return (data = posts[i]);
      }
    }
    return data;
  };
  const router = useIonRouter();
  const goToUsers = () => {
    router.push("/home/feed");
  };
  const usersData = getUserData();
  const [isSaved, setIsSaved] = useState();
  const [presentAlert] = useIonAlert();
  const handleSavedPosts = async () => {
    const userDoc = collection(
      db,
      "users",
      auth.currentUser.uid,
      "saved_posts"
    );
    await addDoc(userDoc, {
      props,
    });
    setIsSaved(true);

    console.log("post saved");
  };
  const handleSavedPost = () => {
    setIsSaved(false);
  };
  const [present] = useIonToast();
  async function handleToast(message) {
    present({
      message: message,
      duration: 2000,
      position: "top",
      color: "lightblack",
      mode: "ios",
      icon: alert,
    });
  }
  const [comments, setComments] = useState();
  const handleCommentAdd = async () => {
    const commentRef = collection(db, "posts", id, "comments");
    if (comments === "" || comments == null) {
      handleToast("Add a Comment");
    } else {
      await addDoc(commentRef, {
        createdAt: new Date(),
        comment: comments,
        name: auth.currentUser.displayName,
      });
    }
    setComments("");
  };
  const [input, setInput] = useState(false);
  const handleComment = () => {
    setInput(true);
  };
  const toggleComment = () => {
    setInput(false);
  };
  const [comm, setComm] = useState();
  useEffect(() => {
    const getUsers = () => {
      const commentRef = collection(db, "posts", id, "comments");

      const q = query(commentRef, orderBy("createdAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let comments = [];
        querySnapshot.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id });
        });
        setComm(comments);
      });
    };
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likesRef = doc(db, "posts", id);
      const handleLike = () => {
    if (usersData.likes?.includes(auth.currentUser.displayName)) {
      updateDoc(likesRef, {
        likes: arrayRemove(auth.currentUser.displayName),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(auth.currentUser.displayName),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const sharePost = async () => {
    await Share.share({
      mode: "md",
      text: usersData.caption,
      image: usersData.img,
      url: "https://play.google.com/store/apps/details?id=com.chatify.app",
    });
  };
  const openFullPost = () => {
    router.push(`/FullPost/${id}`);
  };
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");
    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };
  useIonViewWillEnter(() => hideTabs());

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar color="black">
            <IonRow className="search-row" style={{ paddingLeft: "17px" }}>
              <IonIcon icon={arrowBack} onClick={goToUsers}></IonIcon>
              <IonCol className="friends-col" style={{ paddingLeft: "15px" }}>
                <IonImg
                  src="assets/images/snapshare.png"
                  style={{ width: 130 }}
                ></IonImg>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent className="profile-content">
          <IonCard className="feed-grid" key={id}>
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <IonImg
                  className=""
                  src={
                    usersData.avatar
                      ? usersData.avatar
                      : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                  }
                ></IonImg>
              </IonAvatar>
              <IonCol className="username-col">
                <IonRow className="hello">
                  <IonLabel className="card-subtitle" color="smoke">
                    {usersData.name}
                  </IonLabel>
                </IonRow>
                <IonRow className="hello">
                  <IonLabel className="card-caption">
                    {usersData.email}
                  </IonLabel>
                </IonRow>
              </IonCol>
              <IonIcon
                color="smoke"
                style={{ width: 20, height: 20 }}
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            {usersData.caption ? (
              <IonRow className="caption-row">
                <IonLabel color="smoke" className="caption">
                  {usersData.caption}
                </IonLabel>
              </IonRow>
            ) : (
              <></>
            )}
            {usersData.img ? (
              <IonAvatar onClick={openFullPost} className="fullpost-avatar">
                <IonImg src={usersData.img}></IonImg>
              </IonAvatar>
            ) : (
              <IonImg src={usersData.img}></IonImg>
            )}

            <IonRow className="like-btn-row">
              {usersData.likes?.includes(auth.currentUser.displayName) ? (
                <IonIcon
                  className="like-btn"
                  color="danger"
                  style={{
                    width: 27,
                    height: 27,
                  }}
                  icon={heart}
                  onClick={handleLike}
                ></IonIcon>
              ) : (
                <IonIcon
                  className="like-btn"
                  color="smoke"
                  style={{
                    width: 27,
                    height: 27,
                  }}
                  icon={heartOutline}
                  onClick={handleLike}
                ></IonIcon>
              )}

              {input ? (
                <IonIcon
                  className="like-btn"
                  style={{ width: 25, height: 25 }}
                  icon={chatbubbleOutline}
                  onClick={toggleComment}
                ></IonIcon>
              ) : (
                <IonIcon
                  className="like-btn"
                  color="smoke"
                  style={{ width: 25, height: 25 }}
                  icon={chatbubbleOutline}
                  onClick={handleComment}
                ></IonIcon>
              )}
              <IonIcon
                color="smoke"
                className="like-btn"
                style={{ width: 25, height: 25 }}
                icon={shareOutline}
                onClick={sharePost}
              ></IonIcon>
              <IonCol className="save-btn-col">
                {isSaved ? (
                  <IonIcon
                    className="like-btn"
                    color="smoke"
                    style={{ width: 25, height: 25 }}
                    onClick={() => {
                      handleSavedPost();
                    }}
                    icon={bookmark}
                  ></IonIcon>
                ) : (
                  <IonIcon
                    className="like-btn"
                    color="smoke"
                    style={{ width: 25, height: 25 }}
                    onClick={() => {
                      handleSavedPosts();
                    }}
                    icon={bookmarkOutline}
                  ></IonIcon>
                )}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonLabel color="smoke" className="likes">
                {usersData.likes?.length} Likes
              </IonLabel>
            </IonRow>
            <IonRow className="comments-row">
              {comm &&
                comm.map((currentUser) => {
                  return (
                    <>
                      <IonRow className="newcomments" key={currentUser.id}>
                        <IonCol className="newcomments-col">
                          <IonLabel color="smoke">{currentUser.name}</IonLabel>
                          <IonLabel>&nbsp;{currentUser.comment}</IonLabel>
                        </IonCol>

                        <Moment className="comments-time" fromNow>
                          {currentUser.createdAt.toDate()}
                        </Moment>
                      </IonRow>
                    </>
                  );
                })}
            </IonRow>
            {input ? (
              <IonRow className="comment-input-row">
                <IonInput
                  color="smoke"
                  className="comment-input"
                  id="caption"
                  type="text"
                  value={comments}
                  placeholder="Type a Comment ..."
                  onIonChange={(e) => setComments(e.detail.value)}
                />
                <IonIcon
                  color="smoke"
                  onClick={handleCommentAdd}
                  style={{ width: 25, height: 25 }}
                  icon={send}
                ></IonIcon>
              </IonRow>
            ) : (
              <></>
            )}

            <IonRow className="time">
              <IonCol className="moment">
                <Moment fromNow>{usersData.createdAt.toDate()}</Moment>
              </IonCol>
              {auth.currentUser.email === usersData.email ? (
                <IonButton
                  fill="clear"
                  onClick={() =>
                    presentAlert({
                      cssClass: "delete-alert",
                      header: "Confirm Delete!",
                      color: "danger",
                      backdropDismiss: false,

                      buttons: [
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: () => {
                            handleToast("Alert canceled");
                          },
                        },
                        {
                          text: "OK",
                          role: "confirm",
                          handler: () => {},
                        },
                      ],
                    })
                  }
                >
                  <IonIcon color="smoke" icon={trash}></IonIcon>
                </IonButton>
              ) : (
                <IonRow></IonRow>
              )}
            </IonRow>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default FullPost;
