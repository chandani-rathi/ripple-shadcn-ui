import compose from "./compose";
import evalCode from "./evalCode";
import * as rippleClient from 'ripple/internal/client';
import transform from "./transform";


type GenerateOptions = {
  code: string;
  scope?: Record<string, unknown>;
};

const defaultComponent = "__APP" as const;
const addDeclareComponent = (code: string) => (`
    component ${defaultComponent}(props) {
        ${code}
}`);
const log = (code:string) => {console.log(code); return code}
const wrapReturn = (code: string) => `${code}; return (${defaultComponent};)`;
const trimCode = (code: string) => code.trim().replace(/;$/, "");


export const generateElement = (
    { code = "", scope = {} }: GenerateOptions,
) => {
    console.log("start generateElement", code)
    const transformed = compose<string>(
        log,
        addDeclareComponent,
        log,
        transform(),
        wrapReturn,
        trimCode
    )(code);
    console.log("end generateElement")
    return evalCode(transformed, { "_$_": rippleClient, ...scope });
}