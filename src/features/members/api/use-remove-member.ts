import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { 
    id: Id<"members">;
};
type ResponseType = Id<"members"> | null;

type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
}

export const useRemoveMember = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "setteled" | "pending" | null>(null);


    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSetteled = useMemo(() => status === "setteled", [status]);
  


    const mutation = useMutation(api.members.remove);

    const mutate = useCallback(async (values: RequestType, options?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");
            
            const response = await mutation(values);
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