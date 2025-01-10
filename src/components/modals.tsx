"use client";

import { CreateWorkspaceModel } from "@/features/workspaces/components/create-workspace-model";
import { useEffect, useState } from "react";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return (
        <>
            <CreateWorkspaceModel />
        </>
    )
}