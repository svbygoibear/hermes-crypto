import React, { useState } from "react";
import "./WelcomeSignNote.css";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

export interface WelcomeSignNoteProps {
    doesUserExist: boolean;
    userName: string;
    userEmail: string;
    onSignIn: (name: string, email: string) => Promise<void>;
}

export const WelcomeSignNote: React.FunctionComponent<WelcomeSignNoteProps> = (
    props: WelcomeSignNoteProps
) => {
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setUserName(name);
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setUserEmail(email);
    };

    const onSignInClick = async (): Promise<void> => {
        // Check if the user has entered a name and email, if not, return
        if (userName?.trimEnd() === "" || userEmail?.trimEnd() === "") {
            return;
        }
        // Otherwise, set the signing in state to true and attempt to sign in
        setIsSigningIn(true);
        try {
            await props.onSignIn(userName, userEmail);
        } catch (error) {
            console.log(error);
            throw new Error("Failed to sign in");
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="welcome-sign-note-wrapper">
            {props.doesUserExist && (
                <h2 className="welcome-sign-note-text">
                    Welcome back, <code title={props.userEmail}>[{props.userName}]</code>
                </h2>
            )}
            {!props.doesUserExist && (
                <React.Fragment>
                    <div className="welcome-sign-note-text-wrapper">
                        <h2 className="welcome-sign-note-text-header">
                            Welcome, sign in/up to play!{" "}
                        </h2>
                    </div>
                    <TextField
                        id="outlined-basic"
                        label="name"
                        variant="outlined"
                        size="small"
                        value={userName}
                        onChange={onNameChange}
                        disabled={isSigningIn}
                    />
                    <TextField
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        sx={{ marginLeft: "10px" }}
                        size="small"
                        onChange={onEmailChange}
                        value={userEmail}
                        disabled={isSigningIn}
                    />
                    <LoadingButton
                        loading={isSigningIn}
                        loadingPosition="start"
                        variant="outlined"
                        onClick={onSignInClick}
                        sx={{
                            marginLeft: "10px",
                            backgroundColor: "#ffffff",
                            color: "#f2b4bf",
                            ":hover": {
                                bgcolor: "#f2b4bf",
                                color: "#ffffff"
                            }
                        }}>
                        Log In/ Signup
                    </LoadingButton>
                </React.Fragment>
            )}
        </div>
    );
};
