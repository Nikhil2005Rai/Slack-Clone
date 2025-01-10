"use client";
import { useEffect, useMemo } from "react";

import UserButton from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

export default function Home() {
  const [open, setOpen] = useCreateWorkspaceModal();

  const  { data, isLoading } = useGetWorkspaces();

  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if(isLoading) return;

    if(workSpaceId){
      console.log("Redirect to workspace");
    } 
    else if (!open) {
      setOpen(true);
    }
  }, [workSpaceId, isLoading, open, setOpen])
  
  return (
    <div>
      <UserButton />
    </div>
  );
}
