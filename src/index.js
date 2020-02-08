import * as React from "react";

export const usePersistState = (initalState, config) => {
  const configObject = React.useRef({
    storage: "sessionStorage",
    persistOnUnmount: false
  });
  const [state, setState] = React.useState(() => {
    if (config !== null && typeof config === "object") {
      if(!config.key){
        throw new Error("usePersistState hook require a key in config object.");
      }
      configObject.current.uniqueKey = config.key;
      configObject.current.storage = config.persistAcrosSession
        ? "localStorage"
        : "sessionStorage";
      configObject.current.persistOnUnmount = config.persistOnUnmount || false;
    } else if(typeof config === 'string'){
      configObject.current.uniqueKey = config;
    } else {
      throw new Error("usePersistState hook require a config which should be Object or String");
    }

    let localInfo = window[configObject.current.storage].getItem(configObject.current.uniqueKey);
    if (localInfo) return JSON.parse(localInfo);
    if (initalState && initalState.constructor === Function) {
      let data = initalState();
      return data;
    }
    return initalState;
  });

  React.useEffect(() => {
    window[configObject.current.storage].setItem(configObject.current.uniqueKey, JSON.stringify(state));
    return () => {
      if (!configObject.current.persistOnUnmount)
        window[configObject.current.storage].removeItem(configObject.current.uniqueKey);
    };
  }, [state]);

  return [state, setState];
};
