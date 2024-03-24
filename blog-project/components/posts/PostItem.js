import Link from "next/link";
import Image from "next/image";

import classes from "./PostItem.module.css";

export default function PostsItem(props) {
  const { title, excerpt, slug } = props.post;

  const date = new Date(props.post.date).toLocaleDateString("en-Us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const image = `/images/posts/${slug}/${props.post.image}`;

  const LinkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={LinkPath}>
        <div className={classes.image}>
          <Image src={image} alt={title} priority sizes="100%" fill />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{date}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
