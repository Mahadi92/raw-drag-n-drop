import React, { useRef, useState } from 'react';

const DragNDrop = ({ data }) => {
    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false)

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }
    const handleDragEnd = () => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null;
        dragNode.current = null;
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            setList((oldList) => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]);
                dragItem.current = params;
                return newList
            })
        }
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            return "current dnd-item"
        }
        return "dnd-item"
    }


    return (
        <div className="drag-n-drop">
            {
                list.map((grp, grpI) => {
                    return (
                        <div
                            key={grpI}
                            className="dnd-group"
                            onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
                        >
                            <div className="group-title">{grp.title}</div>
                            {
                                grp.items.map((item, itemI) => {
                                    return (
                                        <div
                                            key={itemI}
                                            className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, { grpI, itemI })}
                                            onDragEnter={(e) => dragging ? handleDragEnter(e, { grpI, itemI }) : null}
                                        >
                                            {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div >
    );
};

export default DragNDrop;