import React, { Component } from 'react';
import { Button } from "antd";
import TextHook from './textHooks'
import "../../style/text.less"

class CustomText extends Component {
    state = {
        editorContent: null
    }
    editorRef = React.createRef()
    onEditorChange = e => {
        this.setState({editorContent: e.target.outerHTML})
    }

    // 获取光标位置相关信息
    getCursorPosition = ele => {
        const sel = window.getSelection()
        let range
        if (sel.rangeCount > 0) {
            range = sel.getRangeAt(0)  // 获取到当前光标所在的元素区域对象

            // 光标不在富文本框内，则将 range 改为 undefined
            if (ele && !ele.contains(range.startContainer)) {
                range = undefined
            }
        }
        return range
    }

    // 设置光标为 ele 元素之后
    setCursorAfter = ele => {
        const sle = window.getSelection()
        const r = sle.getRangeAt(0)
        r.setStartAfter(ele)
        r.setEndAfter(ele)
    }

    insertPlaceholder = (content) => {
        const range = this.getCursorPosition(this.editorRef.current)

        // 创建文本占位符
        const createPh = (content) => {
            let spanDom = document.createElement('span')
            spanDom.setAttribute('contentEditable', false)  // 占位符不能编辑
            spanDom.classList.add('customName')
            spanDom.innerText = content
            return spanDom;
        }

        const placeholderDom = createPh(content)

        if (range) {  // 光标在富文本框内，插入到光标位置
            const rangeData = range.startContainer.data || ''
            if (/{&\w+&}/.test(rangeData)) {  // 光标在占位符上
                const focusPh = range.startContainer.parentElement  // 获取占位符 dom
                this.setCursorAfter(focusPh);  // 光标设置到占位符后面
                range.insertNode(placeholderDom)
            } else {
                range.insertNode(placeholderDom)
            }
        } else {  // 插入到末尾
            this.editorRef.current.appendChild(placeholderDom)
        }

        // 光标移到插入的元素后面
        this.editorRef.current.focus()
        this.setCursorAfter(placeholderDom)
    }
    render() {
        return (
            <>
                <div
                    id="editor"
                    contentEditable={true}
                    onInput={this.onEditorChange}
                    ref={this.editorRef}
                />
                <TextHook/>
                <span style={{marginLeft: "20px"}}/>
                <Button onClick={() => this.insertPlaceholder('大雄')}>大雄</Button>
                <Button onClick={() => this.insertPlaceholder('小夫')}>小夫</Button>
                <Button onClick={() => this.insertPlaceholder('静香')}>静香</Button>
                <Button onClick={() => this.insertPlaceholder('胖虎')}>胖虎</Button>
                <Button onClick={() => this.insertPlaceholder('哆啦A梦')}>哆啦A梦</Button>
            </>
        );
    }
}

export default CustomText;
