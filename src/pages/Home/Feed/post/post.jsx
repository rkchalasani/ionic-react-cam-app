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
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import Propic from "../propic/propic";

const Tab2 = () => {
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
    window.location.reload();
    console.log("clicked");
  };
  const [users, setUsers] = useState([]);
  const [userr, setUserr] = useState([]);
  const [post, setPost] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const usersCollection = collection(db, "user");
  useEffect(() => {
    const getUsers = async () => {
      const datas = await getDocs(usersCollection);
      setPost(datas.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  // const [data, setData] = useState([]);
  // const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  // const pushData = () => {
  //   const max = data.length + 3;
  //   const min = max - 3;
  //   const newData = [];
  //   for (let i = min; i < max; i++) {
  //     post[i].id = post[i].id + i * i;

  //     newData.push(post[i]);
  //   }

  //   setData([...data, ...newData]);
  // };
  // const loadData = (ev) => {
  //   setTimeout(() => {
  //     pushData();
  //     console.log("Loaded data");
  //     ev.target.complete();
  //     if (data.length === 3) {
  //       setInfiniteDisabled(data.length < 3);
  //     }
  //   }, 500);
  // };

  // useIonViewWillEnter(() => {
  //   pushData();
  // });

  return (
    <>
      {/* <IonList> */}

      <>
        {post.map((currentUser) => {
          return (
            <IonCard className="feed-grid" key={currentUser.id}>
              <IonRow className="username-row">
                <IonAvatar className="img-row">
                  {/* <Propic /> */}

                  <IonImg
                    // onClick={openProfile}
                    // style={{ height: 23, width: 23 }}
                    className=""
                    src={currentUser.avatar}
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
              {/* <IonAvatar className="img-row7"> */}
              <IonImg className="post" src={currentUser.img}></IonImg>
              {/* </IonAvatar> */}
              <IonRow className="time">
                <Moment fromNow>{currentUser.createdAt.toDate()}</Moment>
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

      {/* </IonList> */}

      {/* <IonInfiniteScroll
        onIonInfinite={loadData}
        threshold="100px"
        disabled={isInfiniteDisabled}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more data..."
        ></IonInfiniteScrollContent>
      </IonInfiniteScroll> */}
    </>
  );
};

export default Tab2;
