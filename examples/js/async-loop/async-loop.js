// TODO
const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7
}

console.log("Async Loop")

const delayLog = (item) => {
    return new Promise(resolve => setTimeout(resolve, 300))
}

const asyncLoop = async () => {
    Object.keys(obj).forEach(async (item) => {  
        console.log("Log before", item)
        await delayLog(item)
        console.log("Log after", item)
    })
}

asyncLoop()

console.log("Done")
