import {Outlet} from "react-router-dom"

import PostsList from "../components/PostsList"

function Posts() {
    return (
        <>
            <Outlet/>
            <main>
                <PostsList/>
            </main>
        </>
    )
}

async function loader(){
    const response = await fetch('http://localhost:2020/posts')
    const data = await response.json()
    return data.posts
}

export { Posts, loader }
