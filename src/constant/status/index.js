import { generateHashMap } from "../common";
import compute_status from "./compute_status";

const get_compute_status = generateHashMap(compute_status);
export { compute_status, get_compute_status };
