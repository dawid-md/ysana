import axios from "axios"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

export default function Login(){
    return(
        <>
            <h2>Log User</h2>
            <form>
            <div className="mb-3 col-3">
                <label className="form-label">Email address</label>
                <input name="email" type="email" className="form-control" />
            </div>
            <div className="mb-3 col-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}