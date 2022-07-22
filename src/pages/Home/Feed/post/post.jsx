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
  bookmarkOutline,
  chatbubbleOutline,
  ellipsisVertical,
  heart,
  heartOutline,
  send,
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
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [presentAlert] = useIonAlert();

  const deleteUser = async (id) => {
    const userDoc = doc(db, "posts", id);
    await deleteDoc(userDoc);
  };
  const toggleLike = async (id, likecount) => {
    const userDoc = doc(db, "posts", id);
    await updateDoc(userDoc, {
      likecount: likecount + 1,
    });
    setIsLiked(true);
  };
  const toggleUnlike = async (id, likecount) => {
    const userDoc = doc(db, "posts", id);
    await updateDoc(userDoc, {
      likecount: likecount - 1,
    });
    setIsLiked(false);
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
  const { id, avatar, name, email, img, caption, likecount, createdAt, likes } =
    props;
  const [comments, setComments] = useState();
  const handleCommentAdd = async () => {
    const commentRef = collection(db, "posts", id, "comments");
    if (comments === "" || comments == null) {
      handleToast("Add a Comment");
    } else {
      await addDoc(commentRef, {
        // ...data,
        createdAt: new Date(),
        comment: comments,
        name: auth.currentUser.displayName,
        // email: auth.currentUser.email,
        // avatar: auth.currentUser.photoURL,
        // likecount : 0
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

      const q = query(commentRef);
      onSnapshot(q, (querySnapshot) => {
        let comments = [];
        querySnapshot.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id });
        });
        setComm(comments);
      });
    };
    getUsers();
    // console.log(comment)
  }, []);
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
            id="open-popover"
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

        {/* {currentUser.img ? (
              <video
                className="video"
                autoPlay
                loop
                typeof="video/mp4"
                muted
                src={currentUser.img}
              ></video>
            ) : (
              <></>
            )} */}
        {/* <video
          className="video"
          autoPlay
          loop
          muted
          src={img}
        ></video> */}
        <IonRow className="like-btn-row">
          {isLiked ? (
            <IonIcon
              color="smoke"
              className="like-btn"
              style={{ width: 27, height: 27 }}
              icon={heart}
              onClick={() => {
                toggleUnlike(id, likecount);
              }}
            ></IonIcon>
          ) : (
            <IonIcon
              className="like-btn"
              color="smoke"
              style={{ width: 27, height: 27 }}
              icon={heartOutline}
              onClick={() => {
                toggleLike(id, likecount);
              }}
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
              style={{ width: 25, height: 25 }}
              icon={chatbubbleOutline}
              onClick={handleComment}
            ></IonIcon>
          )}

          <IonCol className="save-btn-col">
            <IonIcon
              className="like-btn"
              style={{ width: 25, height: 25 }}
              icon={bookmarkOutline}
            ></IonIcon>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonLabel color="smoke" className="likes">
            {likecount} Likes
          </IonLabel>
        </IonRow>
        <IonRow className="comments-row">
          {comm &&
            comm.map((currentUser) => {
              return (
                <>
                  <IonRow className="newcomments">
                    <IonLabel color="smoke">{currentUser.name}</IonLabel>
                    <IonLabel color="smoke" key={currentUser.id}>
                      &nbsp;{currentUser.comment}
                    </IonLabel>
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
              // onClick={() => {
              //   deleteUser(id);
              // }}
              onClick={() =>
                presentAlert({
                  cssClass: "delete-alert",
                  header: "Confirm Delete!",
                  color: "smoke",

                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel",
                      handler: () => {
                        setHandlerMessage("Alert canceled");
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
                  // onDidDismiss: (e) => setRoleMessage(`Dismissed with role: ${e.detail.role}`)
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
