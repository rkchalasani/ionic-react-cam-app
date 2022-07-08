import {
  IonButton,
  IonButtons,
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
  IonLoading,
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
import { useEffect, useState } from "react";
import "./Tab2.css";
import { storage, db , auth } from "../../../firebase";
import { ref, getDownloadURL, uplaodTask, uploadBytes } from "firebase/storage";
import { getDoc , doc} from "firebase/firestore";
import { setupMaster } from "cluster";

const Tab2 = () => {
 
  // const [handler, setHandler] = useState();
  // const [currentURL, setCurrentURL] = useState();
  // const [uploading, setUploading] = useState()

  // const uploadFile = () => {
  //   setUploading(true)
  //   const fileName = setHandler.name + "-" + new Date().getTime();
  //   const imgRef = storage().ref(`/images/${fileName}`);
  //   imgRef.put(setHandler).then(async (snapShot) => {
  //     console.log(snapShot.bytesTransferred);
  //     const url = await snapShot.ref.getDownloadURL();
  //     setCurrentURL(url);
  //     setUploading(false);
  //   });
  // };
  // const [image, setImage] = useState();
  // const handleChange = (e) => {
  //   // let selected = e.target.files[0];
  //   // console.log(selected);
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  // console.log(image);

  // const handleUplaod = () => {
  //   const uplaodTask = storage.ref(`images/${image.name}`).put(image);
  //   uplaodTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURl()
  //         .then((url) => {
  //           console.log(url)
  //         });
  //     }
  //   );
  // };
  const [img, setImg] = useState();

  useEffect(() => {
getDoc(doc(db,'users', auth.currentUser.uid )).then(docSnap=>{
  if(docSnap.exists){
    setupMaster()
  }
})

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        console.log(snap.ref.fullPath);
      };
      uploadImg()
    }
  }, [img]);
  return (
    <IonPage>
      <IonContent className="feed-content" fullscreen>
        <IonRow className="search-row">
          <IonCol>
            {" "}
            <IonLabel color="smoke">Feed</IonLabel>
          </IonCol>
          <IonIcon icon={addCircleSharp}></IonIcon>
        </IonRow>

        <IonGrid className="feed-grid">
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={(e) => setImg(e.target.files[0])}
            
          />
          <img src={img}  />
          {/* <input type="file" onChange={handleChange} />
          <button onClick={handleUplaod}>upload</button> */}

          {/* <IonRow>{
          {uploading <IonLoading isOpen={uploading } message="upload file"></IonLoading>}}
          </IonRow>

          <input type="file" onChange={(e) => setHandler(e.target.files[0])} />
          <p>Selected File {handler?.name}</p>
          <IonButton onClick={uploadFile}>upload</IonButton>
          <img src={currentURL} width="300" /> */}

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
