import React, {Component} from 'react';
import md5 from 'blueimp-md5'

class ValidateFile extends Component {
    state = {
        fileList: [],
        md5Arr: []
    }
    handleFileChange = e => {
        this.setState({fileList: Object.values(e.target.files)}, async () => {
            if (this.state.fileList[0].type.includes("image")) {
                this.isFileImage(this.state.fileList)
            } else {
                const res = await this.isBigFileRepeat(this.state.fileList[0])
                console.log(res);
            }
        })
    }

    useFileWorker = file => {
        const wk = new Worker('fileWorker.js')
        wk.onmessage = e => {
            console.log(e);
        }
        wk.postMessage(file)
    }
    isFileImage = file => {
        if (file.length !== 0) {
            const f = file[0]
            const fr = new FileReader()
            fr.readAsDataURL(f)
            fr.onload = () => {
                document.querySelector("#base64img").src = fr.result
            }
        }
    }
    isFileRepeat = file => {
        if (file.length !== 0) {
            const t = []
            file.forEach(item => {
                const fr = new FileReader()
                fr.readAsArrayBuffer(item)
                fr.onload = () => {
                    const fileString = (new Uint8Array(fr.result)).join()
                    t.push(md5(fileString))
                }
            })
            console.log(t)
        }
    }
    isBigFileRepeat = async file => {
        const item10M = 10 * 1024 * 1024
        // 每次截取多少二进制
        const eachSize = Math.floor(file.size / 10 > item10M ?  item10M : file.size / 10);
        // 循环截取多少次
        let count = file.size <= item10M ? 10 : Math.ceil(file.size / eachSize)
        // 二进制的截取长度，超出10M后 每10M 截取一部分，最多10M
        let sliceEnd = Math.floor(item10M / file.size * 100 / count * eachSize)
        sliceEnd = count > 10 ? sliceEnd : item10M
        // 转换二进制的长度
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
    render() {
        return (
            <div style={{height: "40%"}}>
                <input type="file" onChange={this.handleFileChange}/>
                {
                    this.state.fileList.map((item, index) => (
                        <div key={index + Math.random()}>{item.name}--{item.type}--{item.size / 1024 / 1024}M</div>
                    ))
                }
                <img width="400px" id="base64img" alt=""/>
            </div>
        );
    }
}

export default ValidateFile;