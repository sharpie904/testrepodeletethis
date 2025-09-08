const generateSlug = (inputString: string) => {
    return inputString.toLowerCase().replace(/ /g, "-");
}

export default generateSlug;