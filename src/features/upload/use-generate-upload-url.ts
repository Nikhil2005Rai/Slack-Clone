import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "../../../convex/_generated/api"; 

type ResponseType = string | null;

type Options = {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}

export const useGenerateUploadUrl = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "setteled" | "pending" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSetteled = useMemo(() => status === "setteled", [status]);
  


    const mutation = useMutation(api.upload.generateUploadUrl);

    const mutate = useCallback(async (_values: {}, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");
            
            const response = await mutation();
            options?.onSuccess?.(response);
            return response;
        } catch (error){
            setStatus("error");
            options?.onError?.(error as Error);
            if(options?.throwError){
                throw error;
            }
        } finally {
            setStatus("setteled");
            options?.onSettled?.();
        }
    }, [mutation]);

    return { 
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSetteled
    };
}