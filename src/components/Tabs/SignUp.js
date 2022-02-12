import React, { useRef } from "react";
import { Fragment } from "react/cjs/react.production.min";
import classes from'./SignUp.module.css'

const SignUp = ()=>{

    const inputEmailRef = useRef();
    const inputPassRef = useRef();
    const inputConfirmPassRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredEmail = inputEmailRef.current.value;
        const enteredPassword = inputPassRef.current.value;

        if(enteredPassword!==inputConfirmPassRef.current.value){
            alert("Confirm Password is not Same");
            return;
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ5pASKEUQTO6M1UISJQoyqGEhI24PTmc",{
            method: 'POST',
            body:JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
              }),
              headers:{
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.ok){

                console.log('Successfully Registered')
                alert('Successfully Registered')
            }
            else{
                return res.json().then(data => {
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        })

    }


    return (
        <Fragment>
        <div className={classes.main}>
            <h2 className={classes.sign}>SignUp</h2>
            <form onSubmit={submitHandler} className={classes.form1}>
                <label htmlFor="signupEmail">Email: </label>
                <input className={classes.un } id="signupEmail" type="email" required ref={inputEmailRef}></input>
                <label htmlFor="signupPass">Password: </label>
                <input className={classes.pass} id="signupPass" type="password" required ref= {inputPassRef}></input>
                <label htmlFor="signupConfirmPass">Confirm Password: </label>
                <input className={classes.pass} id="signupConfirmPass" type="password" required ref = {inputConfirmPassRef}></input>
                <button type="submit" className={classes.submit}>SignUp</button>
            </form>
        </div>
        </Fragment>
    )

}

export default SignUp; 