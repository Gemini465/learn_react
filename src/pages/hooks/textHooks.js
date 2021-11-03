import React, {useRef, useState, useEffect} from "react";
import {Button} from "antd";

function getCursorPosition(ele) {
    const sel = window.getSelection();
    let range;
    if (sel.rangeCount > 0) {
        range = sel.getRangeAt(0);  // 获取到当前光标所在的元素区域对象

        // 光标不在富文本框内，则将 range 改为 undefined
        if (!ele.contains(range.startContainer)) {
            range = undefined;
        }
    }
    return range;
}

// 设置光标为 ele 元素之后
function setCursorAfter(ele) {
    const sle = window.getSelection();
    const r = sle.getRangeAt(0)
    r.setStartAfter(ele);
    r.setEndAfter(ele)
}

export default (props) => {
    let content
    const editorRef = useRef()
    // const [editorRef, setEditorRef] = useState(null);
    const [editorContent, setEditorContent] = useState('');

    const deleteListener = e => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            window.getSelection().getRangeAt(0).deleteContents();
        }
    }

    useEffect(() => {
        const el = editorRef.current
        if (el) {
            el.addEventListener('keydown', deleteListener, false);
            return () => {
                el.removeEventListener('keydown', deleteListener, false);
            }
        }
    }, [editorRef]);

    const insertPlaceholder = (content) => {
        const range = getCursorPosition(editorRef.current);

        // 创建文本占位符
        const createPh = (content) => {
            let spanDom = document.createElement('span');
            spanDom.setAttribute('contentEditable', false);  // 占位符不能编辑
            spanDom.classList.add('customName');
            spanDom.innerText = content
            return spanDom;
        }

        const placeholderDom = createPh(content);

        if (range) {  // 光标在富文本框内，插入到光标位置
            const rangeData = range.startContainer.data || '';
            if (/{&\w+&}/.test(rangeData)) {  // 光标在占位符上
                const focusPh = range.startContainer.parentElement;  // 获取占位符 dom
                setCursorAfter(focusPh);  // 光标设置到占位符后面
                range.insertNode(placeholderDom);
            } else {
                range.insertNode(placeholderDom);
            }
        } else {  // 插入到末尾
            editorRef.current.appendChild(placeholderDom);
        }

        // 光标移到插入的元素后面
        editorRef.current.focus();
        setCursorAfter(placeholderDom);
    }

    return (
        <>
            <div
                id="editor"
                contentEditable={true}
                onInput={e => content = e.target.outerHTML}
                ref={editorRef}
            />
            <span style={{marginLeft: "20px"}}/>
            <Button type="primary" onClick={() => insertPlaceholder('大雄')}>大雄</Button>
            <Button type="primary" onClick={() => insertPlaceholder('小夫')}>小夫</Button>
            <Button type="primary" onClick={() => insertPlaceholder('静香')}>静香</Button>
            <Button type="primary" onClick={() => insertPlaceholder('胖虎')}>胖虎</Button>
            <Button type="primary" onClick={() => insertPlaceholder('哆啦A梦')}>哆啦A梦</Button>
        </>
    )
}