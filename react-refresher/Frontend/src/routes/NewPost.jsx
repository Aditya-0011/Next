import { Link, Form, redirect } from "react-router-dom"

import Modal from "../components/Modal"

import classes from "./NewPost.module.css"

function NewPost() {
    return(
        <Modal>
            <Form className={classes.form} method="post">
                <p>
                    <label htmlFor="body">Text</label>
                    <textarea id="body" name="body" required rows={3}/>
                </p>
                <p>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="author" required/>
                </p>
                <p className={classes.actions}>
                    <Link type="button" to="/">Cancel</Link>
                    <button>Submit</button>
                </p>
            </Form>
        </Modal>
    )
}

async function action({request}){
    const formData = await request.formData()
    const postData = Object.fromEntries(formData)
    await fetch('http://localhost:2020/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return redirect('/')
}

export { NewPost, action }