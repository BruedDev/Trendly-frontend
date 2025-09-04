"use client";

import Tooltip from "@/components/Tooltip";
import { IoIosSearch } from "react-icons/io";
import Search from "@/ui/Search";
import IsOpenButton from "@/components/isOpenButton";

export default function SearchAction() {
  return (
    <Tooltip title="Tìm kiếm" arrow="top-center">
      <IsOpenButton componentToOpen={<Search />}>
        <IoIosSearch size={22} data-original-title="Danh sách tìm kiếm" />
      </IsOpenButton>
    </Tooltip>
  );
}
