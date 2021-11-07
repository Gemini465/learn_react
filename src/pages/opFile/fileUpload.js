import React, {Component} from 'react';
import md5 from 'blueimp-md5'
import request from '../../util/request'
import userApi from '../../api/user'

class FileUpload extends Component {
    state = {
        size: 10 * 1024 * 1024,
        file: null,
        fileChunks: [],
        loaded: 0
    }
    geneFileId = async file => {
        const item10M = 10 * 1024 * 1024
        const eachSize = Math.floor(file.size / 10 > item10M ?  item10M : file.size / 10);
        let count = file.size <= item10M ? 10 : Math.ceil(file.size / eachSize)
        let sliceEnd = Math.floor(item10M / file.size * 100 / count * eachSize)
        sliceEnd = count > 10 ? sliceEnd : item10M
        let start = 0
        let end = 0;
        let promiseArr = []
        while(count--){
            start = end
            end = end + eachSize
            // eslint-disable-next-line no-loop-func
            let promiseArrayBuffer = new Promise((resolve)=>{
                const fr = new FileReader();
                fr.readAsArrayBuffer(file.slice(start,end));
                fr.onload = () => {
                    resolve(
                        new Uint8Array(fr.result)
                            .slice(0, sliceEnd)
                            .join()
                    )
                }
            })
            promiseArr.push(promiseArrayBuffer)
        }
        const result = await Promise.all(promiseArr)
        return md5(result.join())
    }
    regularFileUpload = e => {
        const [file] = e.target.files
        this.setState({file}, () => {
            this.createFileChunk(this.state.file)
        })
    }
    confirmUpload = () => {
        this.uploadChunks()
    }
    request = ({url, method = "post", data, headers = {}}) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key])
            })
            xhr.send(data)
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response)
                } else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                }
            }
        })
    }
    createFileChunk = (file, size = this.state.size) => {
        const fileChunks = []
        let index = 0
        while (index < file.size) {
            fileChunks.push(file.slice(index, index + size))
            index += size
        }
        this.setState({fileChunks})
    }

    uploadChunks = async () => {
        const {file, fileChunks} = this.state
        const fileHash = md5(file.name)
        const requestList = fileChunks.map((item, index) => {
            const formData = new FormData()
            formData.append("fileHash", fileHash)
            formData.append("fileIndex", index)
            formData.append("fileChunk", item)
            return {formData, index}
        }).map(({formData, index}) => {
            return request({
                url: "/api/file/regularFileUpload",
                method: "post",
                data: formData,
                timeout: 3000000,
                onUploadProgress: this.chunkUploadProgress(fileChunks[index])
            })
        })
        Promise.all(requestList).then(async () => {
            // 切片上传完成请求合并
            const r = await userApi.mergeFile({fileHash, fileName: file.name})
            console.log(r)
        })
    }
    chunkUploadProgress = item => {
        return e => {
            item.progress = Math.floor(e.loaded / e.total * 100)
            this.setState({fileChunks: this.state.fileChunks})
        }
    }
    requestMergeFile = async fileHash => {
        const res = this.request({
            url: "",
            headers: {
                "content-type": "application/json"
            },
            data: JSON.stringify({fileHash})
        })
        console.log(res);
    }
    render() {
        const {fileChunks, file} = this.state
        let uploaded = "0%"
        if (fileChunks.length && file.size) {
            const t = fileChunks
                // eslint-disable-next-line array-callback-return
                .map(item => {
                    if (item.progress) {
                        return item.size * item.progress / 100
                    }
                })
                .reduce((pre, cur) => {
                    if (cur) {
                        return pre + cur
                    } else {
                        return pre
                    }
                })
            if (isNaN(t)) {
                uploaded = 0 + "%"
            } else {
                uploaded = Math.floor(t / file.size * 100) + "%"
            }
        }
        return (
            <div>
                <input type="file" onChange={this.regularFileUpload}/>
                <button onClick={this.confirmUpload}>上传</button>
                <br/>
                {uploaded}
                <div style={{width: uploaded, height: "5px", background: "blue", margin: "20px 0"}}/>
                {
                    fileChunks.map((item, index) => {
                        return <div key={index + Math.random()}>
                            {item.size}--------{item.progress}%
                            <div style={{width: item.progress ? item.progress + "%" : "0%", height: "5px", background: "red", margin: "10px 0"}}/>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default FileUpload;