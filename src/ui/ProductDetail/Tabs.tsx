import React, { useState } from "react";
import styles from "./Describe.module.scss";
import { ProductProps } from "@/types/Products_section";
import DescribeTab from "@/ui/Tab/Describe";
import CommentTab from "@/ui/Tab/Comment";

export default function Describe({ product }: ProductProps) {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className={styles.container}>
      {/* Tab Headers */}
      <div className={styles.tabHeader}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tab1" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("tab1")}
        >
          Mô tả
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "tab2" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Bình luận
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "tab1" && <DescribeTab product={product} />}
        {activeTab === "tab2" && <CommentTab />}
      </div>
    </div>
  );
}
