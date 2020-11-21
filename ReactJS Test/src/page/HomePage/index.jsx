import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from "../../util/history";

import imageUser from "../../images/img_235012.png";

import "./style.css";

import { getUserList } from "../../redux/actions";

function HomePage({ getUserList, userList }) {
  useEffect(() => {
    getUserList({
      page: 1,
      limit: 20,
    });
  }, []);

  const renderUserList = () => {
    return userList.map((user, userIndex) => (
      <div
        className="content"
        key={`user-${user.id}-${userIndex}`}
        onClick={() => history.push(`/detail/${user.id}`)}
      >
        <img src={imageUser} alt="imageUser" />
        <p>{user.username}</p>
      </div>
    ));
  };

  return (
    <div className="home">
      <div className="container">{renderUserList()}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userList } = state.testReducer;
  return {
    userList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserList: (params) => dispatch(getUserList(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
