function Login() {
    return (<div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title pb-2">RoomRival</h2>
            <input type="text" placeholder="username"
                   className="input input-bordered input-sm w-full max-w-xs py-2"/>
            <div className="card-actions justify-start pt-2">
                <button className="btn btn-sm btn-outline">Sign up</button>
            </div>
        </div>
    </div>)
}

export default Login;