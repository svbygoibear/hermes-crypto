import React from "react";
import "./WelcomeSignNote.css";

export interface WelcomeSignNoteProps {
    isLoggedIn: boolean;
    userName: string;
    userEmail: string;
    onSignIn: () => void;
}

export const WelcomeSignNote: React.FunctionComponent<WelcomeSignNoteProps> = (
    props: WelcomeSignNoteProps
) => {
    return (
        <div className="welcome-sign-note-wrapper">
            {props.isLoggedIn ?? (
                <h2>
                    Welcome back, <code title={props.userEmail}>[{props.userName}]</code>
                </h2>
            )}
            {!props.isLoggedIn ?? (
                <h2>
                    Welcome, sign in/up to play! <code>[{props.userEmail}]</code>
                </h2>
            )}
        </div>
    );
};
