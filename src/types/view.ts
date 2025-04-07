import { HttpArgs } from "../App";

export type ViewFunc = (...args: HttpArgs) => boolean;
export type ViewFundAsync = (...args: HttpArgs) => Promise<boolean>;
