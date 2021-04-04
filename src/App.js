import "./App.css";
import "./styles/styles.css";
import React, { useEffect, useState } from "react";
import User from "./components/user";
import StatCard from "./components/statCard";
import loading from "./assets/images/loadingpulse.svg";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addLocale(en);

function App() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [stats, setStats] = useState([
    { heading: "Total Spent", value: 0 },
    { heading: "Total Income", value: 0 },
    { heading: "Transactions", value: 0 },
  ]);
  const [trends, setTrends] = useState([]);
  const [similarities, setSimilarities] = useState([]);
  const [gettingUserDetails, setGettingUserDetails] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  //Make request to fetch all users
  const getAllUsers = async () => {
    const allUsersResponse = await fetch(
      "https://kliqr-assess-core.herokuapp.com/users",
      {
        method: "GET",
      }
    );

    const allUsers = await allUsersResponse.json();
    setUsers(allUsers.data);
    setActiveUser(allUsers.data[0]);
    getUserData(allUsers.data[0].id);
  };

  //Make request to get data for specific users
  const getUserData = async (userID) => {
    setGettingUserDetails(true);
    const userDataResponse = await fetch(
      "https://kliqr-assess-core.herokuapp.com/users/" + userID,
      {
        method: "GET",
      }
    );

    const user = await userDataResponse.json();

    const newArray = [...stats];
    newArray[0]["value"] = "₦ " + user.stats[0]["SUM(amount)"];
    newArray[1]["value"] = "₦ " + user.stats[1]["SUM(amount)"];
    newArray[2]["value"] = activeUser?.count;

    setStats(newArray);

    let newTrendsArray = [...trends];
    newTrendsArray = user.trends.data;
    setTrends(newTrendsArray);

    let newSimilaritiesArray = [...similarities];
    newSimilaritiesArray = user.similarities;
    console.log(newSimilaritiesArray);
    setSimilarities(newSimilaritiesArray);

    setGettingUserDetails(false);
  };

  return (
    <div className="App">
      <nav className="nav"></nav>

      <div className="content">
        <div className="contentLeft">
          <p className="leftTitle">USERS</p>
          {users.map((item) => (
            <User
              userDetails={item}
              key={item.id}
              activeUser={activeUser.id}
              onClick={() => {
                setActiveUser(item);
                getUserData(item.id);
              }}
            />
          ))}
        </div>

        <div className="contentRight">
          {gettingUserDetails === true ? (
            <div className="loading">
              <img src={loading} alt="loading icon" />
            </div>
          ) : (
            <React.Fragment>
              <div className="userDetails">
                <div>
                  <img alt="profile pic" src={activeUser?.avatar} />
                  <p className="nameText">
                    {activeUser?.first_name + " " + activeUser?.last_name}
                  </p>
                  <div>
                    <span>{activeUser?.count + " Transactions"}</span>{" "}
                    <span> . </span>{" "}
                    <ReactTimeAgo date={activeUser.created_at} locale="en-US" />
                  </div>
                </div>
              </div>

              <div className="userStats">
                {stats.map((item) => (
                  <StatCard details={item} />
                ))}
              </div>

              <div className="userTrends">
                <div className="trendContainer">
                  <p className="headingText">RECURRING EXPENSES</p>

                  <div className="trendIconsContainer">
                    {trends.map((item) => (
                      <div className="trendIcon">
                        <img src={item.icon_url} alt="trend icon" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="similarContainer">
                  <p className="headingText">USERS LIKE "Jude Agboola"</p>
                  <div>
                    {similarities.map((item) => (
                      <User
                        userDetails={item}
                        key={item.id}
                        activeUser={""}
                        onClick={() => {
                          setActiveUser(item);
                          getUserData(item.id);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
