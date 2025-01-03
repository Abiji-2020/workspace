'use client';

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // Use cookies-next for getting the cookie
import { UserButton } from "./features/auth/components/user-button";
import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "./features/workspaces/store/use-create-workspace-model";
import React from 'react';

export default function Home() {
  const router = useRouter();
  const[open,setOpen]=useCreateWorkspaceModel();
  const {workspaces,isLoading} = useGetWorkspaces();
  const workspaceId = useMemo(()=>workspaces?.[0]?._id,[workspaces])

  useEffect(()=>{
    if(isLoading) return ;
    if(workspaceId){
      router.replace(`/workspace/${workspaceId}`)
    }else if(!open){
      setOpen(true);
    }
  },[workspaceId,isLoading,open,setOpen,router]);

  useEffect(() => {
    const token = getCookie('authToken');
    console.log(token); // Get token using cookies-next
    if (!token) {
      router.push("/auth"); // Redirect to auth if no token
    }
  }, [router]);


  return (
    <div>
      <UserButton/>
    </div>
  );
}
