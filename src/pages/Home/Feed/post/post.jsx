import "./post.css";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonLabel,
  IonIcon,
  IonImg,
  IonRow,
  IonInput,
  useIonToast,
  useIonAlert,
} from "@ionic/react";
import {
  bookmark,
  bookmarkOutline,
  chatbubbleOutline,
  ellipsisVertical,
  heart,
  heartOutline,
  send,
  share,
  shareOutline,
  shareSocialOutline,
  trash,
} from "ionicons/icons";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import { db, auth } from "../../../../firebase";
import {
  doc,
  deleteDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { Share } from "@capacitor/share";

const Post = (props) => {
  const [isSaved, setIsSaved] = useState();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [presentAlert] = useIonAlert();

  const deleteUser = async (id) => {
    const userDoc = doc(db, "posts", id);
    const commentRef = collection(db, "posts", id, "comments");
    const likesRef = collection(db, "posts", id, "likes");

    await deleteDoc(userDoc, commentRef, likesRef);
  };
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
      color: "smoke",
      mode: "ios",
      icon: alert,
    });
  }
  const { id, avatar, name, email, img, caption, createdAt, likes } = props;
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
  }, []);

  const likesRef = doc(db, "posts", id);
  const userDoc = collection(db, "users", auth.currentUser.uid, "liked_posts");
  const userDocs = doc(db, "users", auth.currentUser.uid, "liked_posts", id);

  const handleLike = () => {
    if (likes?.includes(auth.currentUser.displayName)) {
      deleteDoc(userDocs);
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
      // addDoc(userDoc, {
      //   props,
      // });
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
      text: caption,
      image: img,
      url: "https://play.google.com/store/apps/details?id=com.chatify.app",
    });
  };
  return (
    <>
      <IonCard className="feed-grid" key={id}>
        <IonRow className="username-row">
          <IonAvatar className="img-row">
            <IonImg
              className=""
              src={
                avatar
                  ? avatar
                  : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
              }
            ></IonImg>
          </IonAvatar>
          <IonCol className="username-col">
            <IonRow className="hello">
              <IonLabel className="card-subtitle" color="smoke">
                {name}
              </IonLabel>
            </IonRow>
            <IonRow className="hello">
              <IonLabel className="card-caption">{email}</IonLabel>
            </IonRow>
          </IonCol>
          <IonIcon
            color="smoke"
            style={{ width: 20, height: 20 }}
            onClick={sharePost}
            icon={ellipsisVertical}
          ></IonIcon>
        </IonRow>
        {caption ? (
          <IonRow className="caption-row">
            <IonLabel color="smoke" className="caption">
              {caption}
            </IonLabel>
          </IonRow>
        ) : (
          <></>
        )}

        {img ? (
          <IonAvatar className="post-avatar">
            <IonImg src={img}></IonImg>
          </IonAvatar>
        ) : (
          <IonImg src={img}></IonImg>
        )}

        <IonRow className="like-btn-row">
          {likes?.includes(auth.currentUser.displayName) ? (
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
              onClick={handleComment}
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
            {likes?.length} Likes
          </IonLabel>
        </IonRow>
        <IonRow className="comments-row">
          {comm &&
            comm.map((currentUser) => {
              return (
                <>
                  <IonRow className="newcomments">
                    <IonCol className="newcomments-col">
                      <IonLabel color="smoke">{currentUser.name}</IonLabel>
                      <IonLabel key={currentUser.id}>
                        &nbsp;{currentUser.comment}
                      </IonLabel>
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
            <Moment fromNow>{createdAt.toDate()}</Moment>
          </IonCol>
          {auth.currentUser.email === email ? (
            <IonButton
              fill="clear"
              onClick={() =>
                presentAlert({
                  cssClass: "delete-alert",
                  header: "Confirm Delete!",
                  color: "danger",

                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel",
                      handler: () => {
                        // handleToast("Alert canceled");
                      },
                    },
                    {
                      text: "OK",
                      role: "confirm",
                      handler: () => {
                        deleteUser(id);
                      },
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
    </>
  );
};

export default Post;
