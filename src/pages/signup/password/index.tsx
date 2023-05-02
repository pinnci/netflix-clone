import Layout from "@/components/Layout/Layout";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

const Password = () => {
  const registrationEmail = useSelector(
    (state: AppState) => state.registrationEmail.value,
  );

  //TODO:
  // - add password
  // - add register button

  //Call this on btn click
  const register = (e: any) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      "email from redux",
      "password from input",
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <Layout>
      <div className="text-white">
        Email from previous screen is: <h1>{registrationEmail}</h1>
      </div>
    </Layout>
  );
};

export default Password;
