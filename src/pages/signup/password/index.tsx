import { NextSeo } from "next-seo";

import Layout from "@/components/Layout/Layout";
import RegistrationPasswordForm from "@/components/RegistrationPasswordForm/RegistrationPasswordForm";

import { registrationPasswordForm } from "../../../data/registration";

const CreatePassword = () => {
  const { buttonTitle } = registrationPasswordForm;

  return (
    <Layout variant="registration">
      <NextSeo title={buttonTitle} />
      <RegistrationPasswordForm />
    </Layout>
  );
};

export default CreatePassword;
