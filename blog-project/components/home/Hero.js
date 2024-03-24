import Image from "next/image";

import classes from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/avatar.png" alt="" width={300} height={300} />
      </div>
      <h1>Name</h1>
      <p>About</p>
    </section>
  );
}
