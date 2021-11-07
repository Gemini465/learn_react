export function isLeapYear(year) {
    return new Date(year, 1, 29).getDate() === 29
}

export function dowmload(resp, fileName) {
    if (!resp) {
        return
    }
    if (window.navigator.msSaveBlob) {
        try {
            window.navigator.msSaveOrOpenBlob(resp, fileName)
        } catch (e) {
            alert(e)
        }
    } else {
        let url = window.URL.createObjectURL(new Blob([resp.data]))
        if (resp.data === null) {
            url = window.URL.createObjectURL(new Blob([resp]))
        }
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url

        let downloadFileName
        if (fileName) {
            downloadFileName = fileName
        } else {
            downloadFileName = resp.headers['content-disposition']
            downloadFileName = downloadFileName.substr(downloadFileName.indexOf('=') + 1)
        }
        link.setAttribute('download', downloadFileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }
}
