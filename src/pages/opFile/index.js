import React, {Component} from 'react';
import FileUpload from './fileUpload'
import ValidateFile from './validateFile'

class Index extends Component {
    render() {
        return (
            <div style={{padding: "20px", height: "100%"}}>
                文件类型校验，文件重复校验
                <ValidateFile/>
                <div style={{borderBottom: "1px dashed", marginBottom: "20px"}}></div>
                文件上传
                <FileUpload/>
            </div>
        );
    }
}

export default Index;