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
const wrapReturn = (code: string) => `${code}; return (${defaultComponent});`;
const trimCode = (code: string) => code.trim().replace(/;$/, "");
const replaceImports = code => code.replace('import * as _$_ from \'ripple/internal/client\';\n', '');


export const generateElement = (
    { code = "", scope = {} }: GenerateOptions,
) => {
    console.log("start generateElement", code)
    // const transformed = compose<string>(
    //     log,
    //     addDeclareComponent,
    //     log,
    //     transform(),
    //     wrapReturn,
    //     replaceImports,
    //     trimCode
    // )(code);
    const transformed = replaceImports(wrapReturn(log(transform()(log(addDeclareComponent(code))))))
    console.log("end generateElement", transformed)
    return evalCode(transformed, { "_$_": rippleClient, ...scope });
}