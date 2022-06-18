def is_anagram(first_string, second_string):
    string_1 = order_strings(first_string.lower())
    string_2 = order_strings(second_string.lower())
    if string_1 == string_2:
        return True
    else:
        return False


def order_strings(string):
    array_string = list(string)

    for index in range(len(array_string)):
        for i in range(index + 1, len(array_string)):
            if array_string[index] > array_string[i]:
                array_string[index], array_string[i] = (
                    array_string[i],
                    array_string[index],
                )

    return array_string
