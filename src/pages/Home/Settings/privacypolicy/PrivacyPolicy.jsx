import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { doc, getDoc } from "firebase/firestore";
import { arrowBack } from "ionicons/icons";
import { useEffect } from "react";
import { UserAuth } from "../../../../context/AuthContext";
import { auth, db } from "../../../../firebase";

const PrivacyPolicy = () => {
  const router = useIonRouter();
  const goBack = () => {
    router.push("/home/settings");
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
        <IonHeader color="black">
          <IonToolbar color="black">
            <IonRow>
              <IonButton onClick={goBack} fill="clear">
                <IonIcon icon={arrowBack} color="smoke"></IonIcon>
              </IonButton>
              <IonImg src="assets/images/snapshare.png" style={{ width: 150 }}>
                {" "}
              </IonImg>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonContent color="lightblack">
          <IonRow>
            <IonLabel
              style={{
                fontSize: "30px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                fontWeight: "600",
              }}
            >
              Privacy Policy
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Last updated: July 06,
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              2022 This Privacy Policy describes Our policies and procedures on
              the collection, use and disclosure of Your information when You
              use the Service and tells You about Your privacy rights and how
              the law protects You.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the Free Privacy Policy
              Generator.
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "30px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Interpretation and Definitions
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "25px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Interpretation
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              The words of which the initial letter is capitalized have meanings
              defined under the following conditions. The following definitions
              shall have the same meaning regardless of whether they appear in
              singular or in plural.
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "25px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                width: "100vw",
              }}
            >
              Definitions
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              For the purposes of this Privacy Policy:
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Account
              </IonLabel>{" "}
              means a unique account created for You to access our Service or
              parts of our Service.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Affiliate
              </IonLabel>{" "}
              means an entity that controls, is controlled by or is under common
              control with a party, where "control" means ownership of 50% or
              more of the shares, equity interest or other securities entitled
              to vote for election of directors or other managing authority.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Application
              </IonLabel>{" "}
              means the software program provided by the Company downloaded by
              You on any electronic device, named Chatify by PTG
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Company
              </IonLabel>{" "}
              (referred to as either "the Company", "We", "Us" or "Our" in this
              Agreement) refers to PTG, Hyderabad.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Country
              </IonLabel>{" "}
              refers to: Telangana, India
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Device
              </IonLabel>{" "}
              means any device that can access the Service such as a computer, a
              cellphone or a digital tablet.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Personal Data
              </IonLabel>{" "}
              is any information that relates to an identified or identifiable
              individual.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Service
              </IonLabel>{" "}
              refers to the Application.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Service Provider
              </IonLabel>{" "}
              means any natural or legal person who processes the data on behalf
              of the Company. It refers to third-party companies or individuals
              employed by the Company to facilitate the Service, to provide the
              Service on behalf of the Company, to perform services related to
              the Service or to assist the Company in analyzing how the Service
              is used.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                Usage Data
              </IonLabel>{" "}
              refers to data collected automatically, either generated by the
              use of the Service or from the Service infrastructure itself (for
              example, the duration of a page visit).
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                You
              </IonLabel>{" "}
              means a unique account created for You to access our Service or
              means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "30px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Collecting and Using Your Personal Data
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontWeight: "600",
                width: "100vw",
                fontSize: "25px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Types of Data Collected
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "20px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Personal Data
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                width: "100vw",
              }}
            >
              &nbsp;-&nbsp;&nbsp; Email address
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                width: "100vw",
              }}
            >
              &nbsp;-&nbsp;&nbsp; First name and last name
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                width: "100vw",
              }}
            >
              &nbsp;-&nbsp;&nbsp; Usage Data
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "20px",
                paddingLeft: "3%",
                paddingRight: "3%",
                width: "100vw",
                paddingTop: "3%",
              }}
            >
              Usage Data
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Usage Data is collected automatically when using the Service.
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              We may also collect information that Your browser sends whenever
              You visit our Service or when You access the Service by or through
              a mobile device.
            </IonLabel>
            <IonLabel
              style={{
                fontWeight: "600",
                width: "100vw",
                fontSize: "25px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Use of Your Personal Data
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              The Company may use Personal Data for the following purposes:
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                To provide and maintain our Service,
              </IonLabel>{" "}
              including to monitor the usage of our Service.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                To manage Your Account:
              </IonLabel>{" "}
              to manage Your registration as a user of the Service. The Personal
              Data You provide can give You access to different functionalities
              of the Service that are available to You as a registered user.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                For the performance of a contract:
              </IonLabel>{" "}
              the development, compliance and undertaking of the purchase
              contract for the products, items or services You have purchased or
              of any other contract with Us through the Service.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                To contact You
              </IonLabel>{" "}
              by email, telephone calls, SMS, or other equivalent forms of
              electronic communication, such as a mobile application's push
              notifications regarding updates or informative communications
              related to the functionalities, products or contracted services,
              including the security updates, when necessary or reasonable for
              their implementation.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                To provide You
              </IonLabel>{" "}
              with news, special offers and general information about other
              goods, services and events which we offer that are similar to
              those that you have already purchased or enquired about unless You
              have opted not to receive such information.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                To manage Your requests:
              </IonLabel>{" "}
              To attend and manage Your requests to Us.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                For business transfers:
              </IonLabel>{" "}
              We may use Your information to evaluate or conduct a merger,
              divestiture, restructuring, reorganization, dissolution, or other
              sale or transfer of some or all of Our assets, whether as a going
              concern or as part of bankruptcy, liquidation, or similar
              proceeding, in which Personal Data held by Us about our Service
              users is among the assets transferred.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                For other purposes:
              </IonLabel>{" "}
              We may use Your information for other purposes, such as data
              analysis, identifying usage trends, determining the effectiveness
              of our promotional campaigns and to evaluate and improve our
              Service, products, services, marketing and your experience.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              We may share Your personal information in the following
              situations:{" "}
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                With Service Providers:
              </IonLabel>{" "}
              We may share Your personal information with Service Providers to
              monitor and analyze the use of our Service, to contact You.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                For business transfers:
              </IonLabel>{" "}
              We may share or transfer Your personal information in connection
              with, or during negotiations of, any merger, sale of Company
              assets, financing, or acquisition of all or a portion of Our
              business to another company.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                With Affiliates:
              </IonLabel>{" "}
              We may share Your information with Our affiliates, in which case
              we will require those affiliates to honor this Privacy Policy.
              Affiliates include Our parent company and any other subsidiaries,
              joint venture partners or other companies that We control or that
              are under common control with Us.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                With business partners:
              </IonLabel>{" "}
              We may share Your information with Our business partners to offer
              You certain products, services or promotions.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                With other users:
              </IonLabel>{" "}
              when You share personal information or otherwise interact in the
              public areas with other users, such information may be viewed by
              all users and may be publicly distributed outside.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              &nbsp;-&nbsp;&nbsp;
              <IonLabel
                style={{
                  fontWeight: "900",
                }}
              >
                With Your consent:
              </IonLabel>{" "}
              We may disclose Your personal information for any other purpose
              with Your consent.
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontSize: "30px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                fontWeight: "600",
              }}
            >
              Retention of Your Personal Data
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontSize: "30px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
                fontWeight: "600",
              }}
            >
              Transfer of Your Personal Data
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.
            </IonLabel>
            <IonLabel
              style={{
                fontSize: "15px",
                paddingLeft: "3%",
                paddingRight: "3%",
                paddingTop: "3%",
              }}
            >
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </IonLabel>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PrivacyPolicy;
