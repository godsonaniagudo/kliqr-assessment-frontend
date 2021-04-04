import React from "react";
import openIcon from "../assets/images/openicon.svg";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

const User = (props) => {
  return (
    <div
      className={
        props.activeUser === props.userDetails.id
          ? "userItem userItemActive"
          : "userItem userItemPassive"
      }
      onClick={() => {
        props.onClick();
      }}
    >
      <img
        src={props.userDetails.avatar}
        alt="Profile Pic"
        className="avatar"
      />

      <div>
        <p className="nameText">{`${props.userDetails.first_name} ${props.userDetails.last_name}`}</p>
        <div className="metaContainer">
          <div>
            {props.userDetails.count && (
              <React.Fragment>
                <span>{props.userDetails.count + " transactions"}</span>{" "}
                <span> . Joined </span>{" "}
              </React.Fragment>
            )}
            <ReactTimeAgo date={props.userDetails.created_at} locale="en-US" />
          </div>

          <img
            src={openIcon}
            alt="open icon"
            className={
              props.activeUser === props.userDetails.id
                ? "openIconVisible"
                : "openIconHidden"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default User;
