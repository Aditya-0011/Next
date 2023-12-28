import { useLoaderData } from "react-router-dom"

import Post from "./Post"

import classes from "./PostsList.module.css"

export default function PostsList(){
    const posts = useLoaderData()

    return (
        <>
            {posts.length > 0 && (
                <ul className={classes.posts}>
                    {posts.map((post) => (
                        <Post
                            key={post.id}
                            id = {post.id}
                            body={post.body}
                            author={post.author}
                        />
                    ))}
                </ul>
            )}
            {posts.length === 0 &&
                <div
                    style={{
                        textAlign: 'center' ,
                        color: 'white'
                }}
                >
                    <h2>No Posts Yet</h2>
                    <p>Start adding some!</p>
                </div>
            }
        </>
    )
}