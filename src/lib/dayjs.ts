import lib from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import pt from "dayjs/locale/pt-br"

lib.extend(utc)
lib.extend(timezone)
lib.extend(relativeTime)
lib.locale(pt)

export const dayjs = lib