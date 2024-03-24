import Head from "next/head";

import ContactForm from "../../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact the blogger" />
      </Head>
      <ContactForm />
    </>
  );
}
