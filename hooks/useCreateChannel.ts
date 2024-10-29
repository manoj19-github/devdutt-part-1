import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { APISTATUSENUM } from "@/types";
import { useAuthActions } from "@convex-dev/auth/react";
import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type RequestType = any;
type ResponseType = any;
type Options = {
  onSuccess?: (args?: ResponseType) => void;
  onError?: (errors?: any) => void;
  onSetteled?: () => void;
  throwError?: boolean;
};

const useCreateChannel = (options?: Options) => {
  const { signOut } = useAuthActions();
  const [data, setData] = useState<ResponseType>();
  const [apiStatus, setAPIStatus] = useState<APISTATUSENUM>(APISTATUSENUM.INIT);
  const [settled, setSettled] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const mutation = useMutation(api.channels.createChannel);
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
        console.log("result: ", result);
        if (!result || (!!result.isLoggedOut && !result?.data)) {
          signOut();
          options?.onSetteled?.();
          setSettled(true);
          return null;
        }
        if (!!result && result?.data && !result.isLoggedOut) {
          options?.onSuccess?.(result?.data);
          setData(result?.data);
          setAPIStatus(APISTATUSENUM.SUCCESS);
          options?.onSetteled?.();
          setSettled(true);
          return result.data;
        }
        options?.onSetteled?.();
        setSettled(true);
        return result?.data;
      } catch (error: any) {
        setAPIStatus(APISTATUSENUM.ERROR);
        setError(error);
        options?.onError?.(error as Error);
        options?.onSetteled?.();
        setSettled(true);
        return null;
        // if (options?.throwError) throw error;
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

export default useCreateChannel;
