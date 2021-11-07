import md5 from "blueimp-md5"

async function geneFileMd5(file) {
    const is5m = 5 * 1024 * 1024
    const each = file.size > is5m ? is5m : file.size
    let count = file.size <= is5m ? 1: Math.ceil(file.size / each)
    let start = 0, end = 0
    let bufferArr = []
    while (count--) {
        start = end
        end += each
        // eslint-disable-next-line no-loop-func
        const arrayBufferItem = new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.readAsArrayBuffer(file.slice(start, end))
            fr.onload = () => {
                const str = (new Uint8Array(fr.result)).join()
                resolve(str)
            }
        })
        bufferArr.push(arrayBufferItem)
    }
    return md5((await Promise.all(bufferArr)).join())
}

const onmessage = e => {
    console.log(e);
    postMessage('aaaaaaaaa')
}