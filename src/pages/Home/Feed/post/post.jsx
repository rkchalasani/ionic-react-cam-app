import "./post.css";
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonImg,
  // IonLabel,
  IonRow,
  useIonViewWillEnter,
} from "@ionic/react";
import { ellipsisVertical, trash, trashBin } from "ionicons/icons";
import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";
import { storage, db, auth } from "../../../../firebase";
import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
// import Propic from "../propic/propic";

const Tab2 = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    // window.location.reload();
    console.log("clicked");
  };
  const [users, setUsers] = useState([]);
  const [userr, setUserr] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      // const usersCollection = collection(db, "users");
      const postCollection = collection(db, "user");
      const q = query(postCollection, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        let posts = [];
        querySnapshot.forEach((doc) => {
          posts.push(doc.data());
        });
        setPost(posts);
      });
    };
    // getMsgs();

    // const datas = await getDocs(postCollection);
    // setPost(datas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // const data = await getDocs(usersCollection, orderBy("createdAt"));
    // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    getUsers();
  }, []);

  return (
    <>
      {post.map((currentUser) => {
        return (
          <IonCard className="feed-grid" key={currentUser.id}>
            <IonRow className="username-row">
              <IonAvatar className="img-row">
                <IonImg
                  className=""
                  src={
                    currentUser.avatar
                      ? currentUser.avatar
                      : "https://newhorizonindia.edu/nhengineering/mba/wp-content/uploads/2020/01/default_image_01.png"
                  }
                ></IonImg>
              </IonAvatar>
              <IonCol className="username-col">
                <IonRow className="hello">
                  <IonLabel className="card-subtitle" color="smoke">
                    {currentUser.name}
                  </IonLabel>
                </IonRow>
                <IonRow className="hello">
                  <IonLabel className="card-caption">
                    {currentUser.email}
                  </IonLabel>
                </IonRow>
              </IonCol>
              <IonIcon
                color="smoke"
                id="open-popover"
                icon={ellipsisVertical}
              ></IonIcon>
            </IonRow>
            <IonRow className="caption-row">
              <IonLabel color="smoke" className="caption">
                {currentUser.caption}
              </IonLabel>
            </IonRow>
            {
              currentUser.img
              ?
              <IonAvatar className="post-avatar">
              <IonImg src={currentUser.img}></IonImg>
            </IonAvatar>

              :
                 <IonImg src={currentUser.img}></IonImg>
            }
            {/* <IonAvatar className="post-avatar">
              <IonImg src={currentUser.img}></IonImg>
            </IonAvatar> */}
            <IonRow className="time">
              <IonCol className="moment">
                <Moment fromNow>{currentUser.createdAt.toDate()}</Moment>
              </IonCol>
              <IonButton
                color="lightgreen"
                className="del-btn"
                onClick={() => {
                  deleteUser(currentUser.id);
                }}
              >
                <IonIcon icon={trash}></IonIcon>
              </IonButton>
            </IonRow>
          </IonCard>
        );
      })}
   
    </>
  );
};

export default Tab2;
