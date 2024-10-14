import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { APISTATUSENUM } from "@/types";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = any;
type ResponseType = Id<"workspaces">;
type Options = {
  onSuccess?: (args?: ResponseType) => void;
  onError?: (errors?: any) => void;
  onSetteled?: () => void;
  throwError?: boolean;
};

const useCreateWorkSpace = (options?: Options) => {
  const [data, setData] = useState<ResponseType>();
  const [apiStatus, setAPIStatus] = useState<APISTATUSENUM>(APISTATUSENUM.INIT);
  const [settled, setSettled] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const mutation = useMutation(api.workspaces.createWorkspace);
  const isPending = useMemo(
    () => apiStatus === APISTATUSENUM.PENDING,
    [apiStatus]
  );
  const isSuccess = useMemo(
    () => apiStatus === APISTATUSENUM.SUCCESS,
    [apiStatus]
  );
  const isError = useMemo(() => apiStatus === APISTATUSENUM.ERROR, [apiStatus]);
  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        setAPIStatus(APISTATUSENUM.PENDING);
        setData(undefined);
        setAPIStatus(APISTATUSENUM.INIT);
        setSettled(false);
        setError(undefined);
        const result = await mutation(values);
        options?.onSuccess?.(result);
        setData(result);
        setAPIStatus(APISTATUSENUM.SUCCESS);
        return result;
      } catch (error: any) {
        setAPIStatus(APISTATUSENUM.ERROR);
        setError(error);
        options?.onError?.(error as Error);
        if (options?.throwError) throw error;
      } finally {
        options?.onSetteled?.();
        setSettled(true);
      }
    },
    [mutation]
  );

  return {
    mutate,
    isPending,
    isSuccess,
    isError,
    isSettled: settled,
    data,
    error,
  };
};

export default useCreateWorkSpace;
