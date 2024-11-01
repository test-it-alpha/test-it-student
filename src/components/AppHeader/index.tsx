import React from "react";

import { SidebarTrigger } from "../ui/sidebar";
import UserSheet from "./UserSheet";

const AppHeader = ({
  showSidebarTrigger = true,
}: {
  showSidebarTrigger?: boolean;
}) => {
  return (
    <div className="w-full border-b border-b-border sticky top-0">
      <div className="w-full flex items-center justify-between">
        <div className="p-2">{showSidebarTrigger && <SidebarTrigger />}</div>
        <div className="p-2">
          <UserSheet />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
