def is_palindrome_recursive(word, low_index, high_index):
    if high_index < 2 and low_index:
        return True
    elif word == "":
        return False
    elif word[low_index] != word[high_index]:
        return False
    return is_palindrome_recursive(word, low_index + 1, high_index - 1)
