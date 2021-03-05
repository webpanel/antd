import * as React from "react";

import { resolve } from "url";

export const searchChildrenWithType = (
  children: React.ReactNode,
  type: React.ComponentClass
): React.ReactElement<any>[] => {
  const child: any[] = Array.isArray(children) ? [...children] : [children];
  return child.filter(
    (comp: React.ReactNode) =>
      comp && (comp as React.ReactElement<any>).type === type
  );
};

export const appendStringPath = (
  currentPath: string,
  appendPath: string
): string => {
  if (appendPath[0] === "/") {
    appendPath = appendPath.substr(1);
  }
  if (currentPath.substr(-1) !== "/") {
    currentPath += "/";
  }
  let resolvedPath = resolve(currentPath, appendPath);
  if (resolvedPath.substr(-1) !== "/") {
    resolvedPath += "/";
  }
  if (resolvedPath[0] !== "/") {
    resolvedPath = "/" + resolvedPath;
  }
  return resolvedPath;
};
