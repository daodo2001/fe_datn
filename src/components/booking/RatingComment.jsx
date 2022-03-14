import React, { useEffect, useState } from "react";
import "../booking/hoteldetail.css";
import api from "../../services/api";
import ReactStars from "react-rating-stars-component";
import {
  Col,
  Input,
  notification,
  Pagination,
  Rate,
  Row,
} from "antd";

function RatingComment(props) {
  const { idHotel } = props;
  const { TextArea } = Input;
  const user = JSON.parse(localStorage.getItem("user"));
  const [comments, setComments] = useState({
    comment: "",
    user_id: 0,
    hotel_id: 0,
    star: 0,
  });
  const [listComment, setListComment] = useState([]);
  const [reloadComment, setReloadComment] = useState(false);
  const [checkCommentExists, setCheckCommentExists] = useState();
  const [checkUserComments, setCheckUserComments] = useState(0);
  const [minMax, setMinMax] = useState({
    minValue: 0,
    maxValue: 2,
  });

  const onchangeComment = (event) => {
    setComments({
      ...comments,
      comment: event.target.value,
      user_id: user.id,
      hotel_id: idHotel.params.id,
    });
  };

  useEffect(() => {
    api.get("/user/comment/" + idHotel.params.id).then((res) => {
      setListComment(res.data.data);
    });
    if (user !== null) {
      api
        .get("/user/comment/" + user.id + "/" + idHotel.params.id)
        .then((res) => {
          if (res.data.data === 0) {
            setCheckCommentExists(0);
          } else {
            setCheckCommentExists(1);
          }
        });

      api
        .get(
          "/user/comment/check/user/comments/" +
          user.id +
          "/" +
          idHotel.params.id
        )
        .then((res) => {
          if (res.data.data === 0) {
            setCheckUserComments(0);
          } else {
            setCheckUserComments(1);
          }
        });
    }
  }, [reloadComment]);

  function create() {
    api
      .post("/user/comment", comments, {
        headers: {
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((res) => {
        setReloadComment(!reloadComment);
        setComments({});
        notification["success"]({
          message: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: err.response.data.message,
        });
      });
  }
  // console.log(checkCommentExists);

  const starCustom = {
    size: 40,
    count: 5,
    color: "black",
    activeColor: "yellow",
    value: 0,
    a11y: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => setComments({ ...comments, star: newValue }),
  };
  console.log(checkUserComments);

  const handleChange = (value) => {
    if (value <= 1) {
      setMinMax({
        minValue: 0,
        maxValue: 2,
      });
    } else {
      setMinMax({
        minValue: 2,
        maxValue: value * 2,
      });
    }
  };

  return (
    <div className="rating">
      <div className="danh-gia">Bình Luận</div>

      {listComment.length <= 0 ? (
        ""
      ) : (
        <div>
          {listComment &&
            listComment.length > 0 &&
            listComment
              .slice(minMax.minValue, minMax.maxValue)
              .map((item, index) => (
                <div className="comment-lines" key={index}>
                  <Row>
                    <Col span={4}>
                      <label>{item.users.username} </label>
                    </Col>
                    <Col span={5}>
                      <Rate
                        style={{ fontSize: 15 }}
                        disabled
                        defaultValue={item.star}
                      />
                    </Col>
                  </Row>

                  <hr />
                  <span style={{ textAlign: "left" }}>{item.comment}</span>
                </div>
              ))}
          <Pagination
            style={{
              float: "right",
              marginRight: 50,
              marginBottom: 10,
              marginTop: 10,
            }}
            defaultCurrent={1}
            defaultPageSize={2}
            onChange={handleChange}
            total={listComment.length + 1}
          />
        </div>
      )}

      {user !== null && checkCommentExists === 1 && checkUserComments === 1 ? (
        <>
          <hr />
          <div className="danh-gia">Đánh Giá</div>
          <div className="star">
            <ReactStars {...starCustom} />
          </div>
          <div className="comment">
            <TextArea
              rows={4}
              placeholder="Vui lòng viết đánh giá!"
              onChange={onchangeComment}
              value={comments.comment}
            />
          </div>
          <button
            onClick={() => {
              if (comments.star === 0) {
                notification["warning"]({
                  message: "Vui lòng chọn số sao!",
                });
              } else if (comments.comment === null || comments.comment === "") {
                notification["warning"]({
                  message: "Vui lòng nhập đánh giá!",
                });
              } else {
                create();
              }
            }}
            className="btn btn-primary btn-danhgia"
          >
            Viết đanh giá
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default RatingComment;