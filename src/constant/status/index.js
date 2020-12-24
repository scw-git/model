import { generateHashMap } from "../common";
import compute_status from "./compute_status";
import task_status from "./task_status";

const get_compute_status = generateHashMap(compute_status);
const get_task_status = generateHashMap(task_status);
export { compute_status, get_compute_status, task_status, get_task_status };
