//% color=190 weight=100 icon="\uf1c0" block="XinaBox JSON"
namespace xinabox_json
{
let sensor_id: string = ""
let name: string = ""
let scale: string
let value: string
let name_key_index: number = 0
let name_string: number = 0
let scale_id: string
let scale_string: number = 0
let scale_key_index: number = 0
let value_string: number = 0
let value_key_index: number = 0
let first_quotation = 0
let second_quotation = 0
let value_array: string[] = []
let scale_array: string[] = []
let uids: string[] = []
let count: number = 0
let num: number = 0

    //% blockId=parse_json
    //% block="XinaBox parse json string %str"
    export function parse_json(str: string)
    {

        while(true)
        {

            // sensor id
            first_quotation = str.indexOf("\"", second_quotation + 1)
            second_quotation = str.indexOf("\"", first_quotation + 1)
            sensor_id = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)

            // sensor name
            name_key_index = str.indexOf("\"name\"", second_quotation + 1)
            name_string = "\"name\"".length + name_key_index
            first_quotation = str.indexOf("\"", name_string + 1)
            second_quotation = str.indexOf("\"", first_quotation + 1)
            name = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)


            while(true)
            {

                // scale id
                first_quotation = str.indexOf("\"", second_quotation + 1)
                second_quotation = str.indexOf("\"", first_quotation + 1)
                scale_id = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                uids[count] = scale_id

                // sensor scale
                scale_key_index = str.indexOf("\"scale\"", second_quotation)
                scale_string = "\"scale\"".length + scale_key_index
                first_quotation = str.indexOf("\"", scale_string + 1) 
                second_quotation = str.indexOf("\"", first_quotation + 1)
                scale = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                scale_array[count] =  scale

                // sensor value
                value_key_index = str.indexOf("\"value\"", second_quotation)
                value_string = "\"value\"".length + value_key_index
                first_quotation = str.indexOf("\"", value_string + 1)
                second_quotation = str.indexOf("\"", first_quotation + 1)
                value = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                value_array[count] = value

                count++

                if((str.indexOf("}}", second_quotation) - second_quotation) < 5)
                {
                    break
                }

            }

            if((str.indexOf("}", second_quotation) > 0) && (str.indexOf("}", second_quotation + 1) > 0) && (str.indexOf("}", second_quotation + 2) > 0) && (str.indexOf("{", second_quotation) < 0))
            {
                break
            }

        }

   
    }


    //% blockId=getMeasure
    //% block="XinaBox get measure by uid %uid"
    export function getMeasure(uid: string): string
    {
        let index: number = 0
        let measure: string = ""

        index = uids.indexOf(uid)

        if(index >= 0)measure = value_array[index]
        
        return measure
    }

    //% blockId=getScale
    //% block="XinaBox get scale by uid %uid"
    export function getScale(uid: string): string
    {
        let index: number = 0
        let scale_local: string = ""

        index = uids.indexOf(uid)

        if(index >= 0)scale_local = scale_array[index]
        
        return scale_local
    }

}
