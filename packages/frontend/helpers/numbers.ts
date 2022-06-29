/**
 *
 * formatWithThousandsSeparators
 *
 * returns number sting with thousand serators
 *
 * toLocalString() not being used for the time being as
 * it is not supported by some browsers, & by default
 * rounds to two decimal places.
 *
 * Current regex being used:
 * https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 *
 * @param val value ie. 100000000
 * @return string 100,000,000
 **/
export const formatWithThousandsSeparators = (val: number | string, maxDigits: number = 8): string => {
    return Number(val).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: maxDigits});
    // line below is probably the cause for the exception on safari: https://stackoverflow.com/questions/51568821/works-in-chrome-but-breaks-in-safari-invalid-regular-expression-invalid-group
    // return val.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,    ",");
    // return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}