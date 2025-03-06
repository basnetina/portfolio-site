import dayjs from "dayjs";
import {TimeObj} from "@/types/ProjectInterface";

const unixToDate = (from: TimeObj | undefined, to: string ="YYYY-MM-DD HH:mm:ss") => {
    if(from){
        return dayjs.unix(from?.seconds).format(to);
    }
    return "";
}

export default unixToDate