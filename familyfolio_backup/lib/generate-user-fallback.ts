const generateUserFallback = (name: string) => {
    console.log(name)
    if (name === "" || name === undefined) {
        console.log("returning empty string");
        return ""
    }

    if (name.length === 1) {
        console.log("returning first letter");
        return name[0]
    }

    if (name.split(" ").length > 1) {
        console.log("returning first letters of first and last name");
        const [firstName, lastName] = name.split(" ")
        return `${firstName[0]}${lastName[0]}`
    }

    if (name.split(" ").length === 1) {
        return name[0]
    }

    console.log("default return");
    return ""
}

export default generateUserFallback