import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import history from "../../util/history";

import "./style.css";
import { Radio, Button, Pagination, Input } from "antd";
import { getUserDetail, getUserList, getSoftList } from "../../redux/actions";

function DetailPage({
  getUserDetail,
  userDetail,
  match,
  getUserList,
  userList,
  softList,
  getSoftList,
}) {
  const [toggleTodo, setToggleTodo] = useState(false);
  const [togglePhoto, setTogglePhoto] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const [current, setCurrent] = useState(1);
  const [isShowList, setIsShowList] = useState(false);
  const [searchKey, setSearchKey] = useState();
  useEffect(() => {
    getUserDetail({
      id,
    });
  }, []);

  const id = match.params.id;
  const { Search } = Input;
  const userInfo = userDetail.slice(0, 1);
  const todoInfo = userDetail.filter((item) => item.userId == id);
  const photoInfo = userDetail.filter((item) => item.albumId == id);
  const commentInfo = userDetail.filter((item) => item.postId == id);

  // show todo, photo, comment
  const toggleItem = (e) => {
    setCurrent(1);
    if (e.target.value == "todo") {
      setToggleTodo(!toggleTodo);
      setTogglePhoto(false);
      setToggleComment(false);
      getUserList({
        userId: id,
        page: 1,
        limit: 10,
      });
    }
    if (e.target.value == "photo") {
      setToggleTodo(false);
      setTogglePhoto(!togglePhoto);
      setToggleComment(false);
      setIsShowList(false);
    }
    if (e.target.value == "comment") {
      setToggleTodo(false);
      setTogglePhoto(false);
      setToggleComment(!toggleComment);
      getUserList({
        postId: id,
        page: 1,
        limit: 10,
      });
      setIsShowList(false);
    }
  };

  //soft status todo
  const handelSoft = (e) => {
    if (e.target.value == "true") {
      getSoftList({
        status: "true",
        id: id,
      });
    } else if (e.target.value == "false") {
      getSoftList({
        status: "false",
        id: id,
      });
    }
    setCurrent(1);
    setIsShowList(true);
  };

  // set value searchKey when change input
  const handelChangeSearch = (e) => {
    if (e.target.value === "") {
      setSearchKey("");
    }
  };

  const handelGetValueSearch = (e) => {
    if (e != "") {
      setSearchKey(e);
    } else setIsShowList(false);
  };

  //select arr search
  const filterSearchListData = () =>
    (softList.length > 0 && isShowList == true && searchKey != ""
      ? softList
      : todoInfo
    ).filter((item) => {
      return item.title.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
    });

  // select arr render todo
  const selectArrForTodo = () => {
    if (isShowList) {
      if (softList && !searchKey) return softList;
      else if (softList && searchKey) return filterSearchListData();
    } else {
      if (searchKey) return filterSearchListData();
      else return userList;
    }
  };
  const renderUser = () => {
    return userInfo.map((item, index) => (
      <div className="user" key="user">
        <p className="">
          <span className="a">name</span>
          <span>{item.name}</span>
        </p>
        <p>
          <span>username</span>
          <span>{item.username}</span>
        </p>
        <p>
          <span>email</span>
          <span> {item.email}</span>
        </p>
        <p>
          <span>address</span>
          <span>
            {item.address.suite}, {item.address.street}, {item.address.city}
          </span>
        </p>
        <p>
          <span>phone</span>
          <span>{item.phone}</span>
        </p>
        <p>
          <span>website</span>
          <span>{item.website}</span>
        </p>
        <p>
          <span>company</span>
          <span>{item.company.name}</span>
        </p>
      </div>
    ));
  };

  const renderTodo = () => {
    return selectArrForTodo().map((todoItem, todoIndex) => (
      <div
        className="todo content flex-column"
        key={`todo-${todoItem.id}-${todoIndex}`}
      >
        <div className="todo-container">
          <p>{todoItem.title}</p>
          <p
            className={`${
              todoItem.completed == true
                ? "todo-status-true"
                : "todo-status-false"
            }`}
          >{`${todoItem.completed}`}</p>
        </div>
        <div className="btn">
          <Button>Sửa</Button>
        </div>
      </div>
    ));
  };
  const renderPhoto = () => {
    return photoInfo.map((photoItem, photoIndex) => (
      <div
        className="photo content"
        key={`photo-${photoItem.id}-${photoIndex}`}
      >
        <img src={photoItem.thumbnailUrl} alt="photoItem" />
        <p>{photoItem.title}</p>
      </div>
    ));
  };
  const renderComment = () => {
    return userList.map((commentItem, commentIndex) => (
      <div
        className=" content flex-column"
        key={`comment-${commentItem.id}-${commentIndex}`}
      >
        <p>{commentItem.body}</p>
        <p>{userInfo.map((item) => item.username)}</p>
      </div>
    ));
  };
  return (
    <div className="detail">
      <div className="detail-container">
        <div className="container">{renderUser()}</div>
        <div className=" ">
          <div className="detail-selected container">
            <Radio.Group size="large">
              <Radio.Button value="todo" onClick={(e) => toggleItem(e)}>
                {`Todo (${todoInfo.length})`}
              </Radio.Button>
              <Radio.Button value="photo" onClick={(e) => toggleItem(e)}>
                {`Photo (${photoInfo.length})`}
              </Radio.Button>

              <Radio.Button value="comment" onClick={(e) => toggleItem(e)}>
                {`Comment (${commentInfo.length})`}
              </Radio.Button>
            </Radio.Group>
          </div>
          <div className="">
            {toggleTodo === true && (
              <>
                <div className="detail-search-soft container">
                  <div className="detail-search container">
                    <Search
                      placeholder="Nhập tên bạn muốn tìm"
                      onChange={(value) => handelChangeSearch(value)}
                      onSearch={(value) => handelGetValueSearch(value)}
                      className="hotel-left-content-search"
                    />
                  </div>
                  <Radio.Group size="large" className="container ">
                    <Radio.Button value="photo">Trạng thái</Radio.Button>

                    <Radio.Button value="true" onClick={(e) => handelSoft(e)}>
                      True
                    </Radio.Button>
                    <Radio.Button value="false" onClick={(e) => handelSoft(e)}>
                      False
                    </Radio.Button>
                  </Radio.Group>
                </div>
                <div className="container">{renderTodo()}</div>
                <div className="container ">
                  <Pagination
                    current={current}
                    total={30}
                    onChange={(page) => {
                      return (
                        setCurrent(page),
                        getUserList({
                          userId: id,
                          page,
                          limit: 10,
                        })
                      );
                    }}
                  />
                </div>
              </>
            )}
            {togglePhoto === true && (
              <div className="container">{renderPhoto()}</div>
            )}
            {toggleComment === true && (
              <>
                <div className="container ">{renderComment()}</div>
                <div className="container ">
                  <Pagination
                    current={current}
                    total={30}
                    onChange={(page) => {
                      return (
                        setCurrent(page),
                        getUserList({
                          postId: id,
                          page,
                          limit: 10,
                        })
                      );
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userDetail, userList, softList } = state.testReducer;
  return {
    userDetail,
    userList,
    softList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: (params) => dispatch(getUserDetail(params)),
    getUserList: (params) => dispatch(getUserList(params)),
    getSoftList: (params) => dispatch(getSoftList(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
