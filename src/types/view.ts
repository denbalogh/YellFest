import { HttpArgs } from "../App";

export type ViewFunc = (...args: HttpArgs) => boolean;
export type ViewFuncAsync = (...args: HttpArgs) => Promise<boolean>;
