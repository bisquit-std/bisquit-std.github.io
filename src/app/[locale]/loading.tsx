import React from "react";

export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center bg-background">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
