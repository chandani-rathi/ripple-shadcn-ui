import { compile } from "ripple/compiler";

type Options = {

}

function _transform(code){
    const result = compile(code, 'file.ripple', { mode: 'client' });
    console.log(result.js)
    return result.js
}

export default function transform(opts: Options = {}){
    return (code: string) => (_transform(code).code);
}