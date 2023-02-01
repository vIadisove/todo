import React, {useRef} from 'react';
import {Card, Container} from "@mui/material";
import MyButton from "./UI/button/myButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./ItemTypes";

const ItemBoard = (id,text, index, moveCard) => {
    const ref = useRef(null)
    const [{handlerId}, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor){
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor){
            if(!ref.current){
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex){
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex

        },
    })


    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return {id,index}
        },
        collect: (monitor) => ({
            isDragging:monitor.isDragging(),
        }),
    })
    drag(drop(ref))


    return (
        <div ref={ref} data-handler-id={handlerId}>
            <div> {text}</div>
            <div>Задачи доски</div>
            <MyButton size = "small" startIcon={<DeleteIcon/>}>удалить доску</MyButton>
        </div>
    );
};

export default ItemBoard;