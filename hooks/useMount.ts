"use client";

import { useEffect, useState } from "react";

const useMount = (): boolean => {
  const [isMount, setIsMount] = useState<boolean>(false);
  // is mounted is client side or not
  useEffect(() => {
    setIsMount(true);
  }, []);
  return isMount;
};

export default useMount;
