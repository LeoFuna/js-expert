import StringUtil from "@leofuna/string-util";

const availableFormats = {
    'dd-mm-yyyy': '$<day>-$<month>-$<year>',
    'yyyy-mm-dd': '$<year>-$<month>-$<day>',
    'dd/mm/yyyy': '$<day>/$<month>/$<year>',
}

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g

const stringToDateExpression = {
    'yyyy-mm-dd': yymmdd,
    'dd-mm-yyyy': ddmmyy,
    'dd/mm/yyyy': ddmmyy,
}

export default class DateUtil {
    static formatDate(date, format) {
        if (!availableFormats[format]) {
            return { error: `the format ${format} is not available yet` }
        }
        const [result] = date.toISOString().match(yymmdd)
        return result.replace(yymmdd, availableFormats[format])
    }

    static formatString(dateStr, currentFormat, expectedFormat) {
        if (StringUtil.isEmpty(dateStr)) return  { error: 'your test is empty' };
        
        if (!availableFormats[currentFormat]) {
            return { error: `the format ${currentFormat} is not available yet` }
        }

        if (!availableFormats[expectedFormat]) {
            return { error: `the format ${expectedFormat} is not available yet` }
        }
        const toDateExp = stringToDateExpression[currentFormat];
        const dateStrSerialized = StringUtil
            .removeEmptySpaces(dateStr)
            .replace(toDateExp, availableFormats['yyyy-mm-dd']);
        const date = new Date(dateStrSerialized);
        
        return this.formatDate(date, expectedFormat); 
    }
}