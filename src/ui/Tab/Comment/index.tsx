import React from "react";
import styles from "./Comment.module.scss";

export default function CommentTab() {
  return (
    <div className={styles.tabPane}>
      <h3>Tiêu Đề bình luận</h3>
      <p>Phần mềm bình luận</p>
    </div>
  );
}
