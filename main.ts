//% color=190 weight=100 icon="\uf1c0" block="XinaBox JSON"
namespace xinabox_json
{
    //% blockId=parse_json
    //% block="XinaBox parse json %str"
    export function parse_json(str: string)
    {
        let first_curly_bracket_find = str.indexOf("{",0)
        let id_first_quotation_find = str.indexOf("\"", first_curly_bracket_find)
        let id_second_quotation_find = str.indexOf("\"", id_first_quotation_find)
        let id: string = str.substr(id_first_quotation_find, id_second_quotation_find - id_first_quotation_find)

        basic.showNumber(first_curly_bracket_find)
        basic.showNumber(id_first_quotation_find)
        basic.showNumber(id_second_quotation_find)
        basic.showString(id)
   
    }
}
