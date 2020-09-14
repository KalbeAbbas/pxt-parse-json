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
let count2: number = 0
let num: number = 0
let global_key1: string = ""
let global_key2: string = ""
let level_one_uid: string[] = []
let level_two_uid: string[] = []
let level_one_key: string[] = []
let level_two_key: string[] = []
let str2: string = ""


    function init()
    {
        while(true)
            {

                // level_one id
                first_quotation = str2.indexOf("\"", second_quotation + 1)
                second_quotation = str2.indexOf("\"", first_quotation + 1)
                sensor_id = str2.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                level_one_uid[count2] = sensor_id

                // level_one first key
                first_quotation = str2.indexOf("\"", second_quotation + 1)
                second_quotation = str2.indexOf("\"", first_quotation + 1)
                name = str2.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                level_one_key[count2] = name
                basic.showString(name)

                if((str2.indexOf("{", second_quotation) - 20) >= 0)
                {
                    second_quotation = str2.indexOf("{", second_quotation) - 20
                    second_quotation = str2.indexOf(",", second_quotation)

                    count2++

                    let right_bracket: number = 0

                    while(true)
                    {

                        // level_two id
                        first_quotation = str2.indexOf("\"", second_quotation + 1)
                        second_quotation = str2.indexOf("\"", first_quotation + 1)
                        scale_id = str2.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                        level_two_uid[count] = scale_id

                        // level_two first key
                        first_quotation = str2.indexOf("\"", second_quotation + 1)
                        second_quotation = str2.indexOf("\"", first_quotation + 1)
                        value = str2.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                        level_two_key[count] = value

                        second_quotation = str2.indexOf("}", second_quotation)

                        count++

                        if(str2.indexOf("}", second_quotation) > 0)
                        {
                            let right_bracket = str2.indexOf("}", second_quotation)
                            if(((str2.indexOf("}", right_bracket + 1) - right_bracket) >= 0) && ((str2.indexOf("}", right_bracket + 1) - right_bracket) < 5))
                            {
                                let second_right_bracket = str2.indexOf("}", right_bracket)
                                break
                            }
                        }


                    }

                }


                if((str2.indexOf("}", second_quotation) >= 0) && (str2.indexOf("}", second_quotation + 1) >= 0) && (str2.indexOf("}", second_quotation + 2) >= 0) && (str2.indexOf("{", second_quotation) < 0))
                {
                    break
                }

            }

            global_key1 = level_one_key[0]
            global_key2 = level_two_key[0]
    }

    //% blockId=load_json
    //% block="XinaBox load json %json"
    export function load_json(json: string)
    {
        str2 = json

        // extract level one and two first key names
        init()
    }


    function parse_json(str: string)
    {

        // Search for particular key

        second_quotation = 0

        count = 0
        count2 = 0

        while(true)
        {

            // sensor id
            first_quotation = str.indexOf("\"", second_quotation + 1)
            second_quotation = str.indexOf("\"", first_quotation + 1)
            sensor_id = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
            level_one_uid[count2] = sensor_id

            // sensor name
            name_key_index = str.indexOf("\"" + global_key1 + "\"", second_quotation + 1)
            name_string = ("\"" + global_key1 + "\"").length + name_key_index
            first_quotation = str.indexOf("\"", name_string + 1)
            second_quotation = str.indexOf("\"", first_quotation + 1)
            name = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
            level_one_key[count2] = name

            if((str.indexOf("{", second_quotation) - 20) >= 0)
            {
                second_quotation = str.indexOf("{", second_quotation) - 20
                second_quotation = str.indexOf(",", second_quotation)

                count2++

                let right_bracket: number = 0

                while(true)
                {

                    // scale id
                    first_quotation = str.indexOf("\"", second_quotation + 1)
                    second_quotation = str.indexOf("\"", first_quotation + 1)
                    scale_id = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                    level_two_uid[count] = scale_id

                    // sensor value
                    value_key_index = str.indexOf("\"" + global_key2 + "\"", second_quotation)
                    value_string = ("\"" + global_key2 + "\"").length + value_key_index
                    first_quotation = str.indexOf("\"", value_string + 1)
                    second_quotation = str.indexOf("\"", first_quotation + 1)
                    value = str.substr(first_quotation + 1, second_quotation - first_quotation - 1)
                    level_two_key[count] = value

                    second_quotation = str.indexOf("}", second_quotation)



                    count++

                    if(str.indexOf("}", second_quotation) > 0)
                    {
                        let right_bracket = str.indexOf("}", second_quotation)
                        if(((str.indexOf("}", right_bracket + 1) - right_bracket) >= 0) && ((str.indexOf("}", right_bracket + 1) - right_bracket) < 5))
                        {
                            let second_right_bracket = str.indexOf("}", right_bracket)
                            break
                        }
                    }


                }

            }


            if((str.indexOf("}", second_quotation) >= 0) && (str.indexOf("}", second_quotation + 1) >= 0) && (str.indexOf("}", second_quotation + 2) >= 0) && (str.indexOf("{", second_quotation) < 0))
            {
                break
            }

        }

    }


    //% blockId=getLevelOneValue
    //% block="XinaBox get level one value of uid %uid and key %key"
    export function getLevelOneValue(uid: string, key: string)
    {
        let index: number = 0
        let value: string = ""

        count = 0
        count2 = 0
        second_quotation = 0

        global_key1  = key

        parse_json(str2)

        index = level_one_uid.indexOf(uid)

        if(index >= 0)value = level_one_key[index]

        return value
    }

    //% blockId=getLeveTwoValue
    //% block="XinaBox get level two value of uid %uid and key %key"
    export function getLevelTwoValue(uid: string, key: string)
    {
        let index: number = 0
        let value: string = ""

        count = 0
        count2 = 0
        second_quotation = 0

        global_key2  = key

        parse_json(str2)

        index = level_two_uid.indexOf(uid)

        if(index >= 0)value = level_two_key[index]

        return value
    }

}
