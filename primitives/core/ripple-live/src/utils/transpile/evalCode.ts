import type { Component } from "ripple";

const evalCode = (
  code: string,
  scope: Record<string, unknown>
): Component => {
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  return new Function(...scopeKeys, code)(...scopeValues);
};

export default evalCode;
