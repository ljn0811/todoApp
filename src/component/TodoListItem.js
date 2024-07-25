//할 일 항목에 대한 정보를 보여 줌
//todo 객체를 props로 받아 상태에 따라 다른 스타일의 UI를 보여 줌
import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    //할 일이 완료되었을 때 체크된 상태를 보여 주기 위해 사용
    MdCheckBox, 
    MdRemoveCircleOutline,
} from 'react-icons/md';
//조건부 스타일링을 위해 classnames를 사용
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
    const { id, text, checked } = todo;

    return (
        //TodoListItem-virtualized 클래스: 컴포넌트 사이사이 테두리를 제대로 쳐 주고, 홀수 번째 / 짝수 번째 항목에 다른 배경 색상 설정
        <div className='TodoListItem-virtualized' style={style}>
            <div className='TodoListItem'>
                <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                    <div className='text'>{text}</div>
                </div>
                <div className='remove' onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        </div>
    );
};

//컴포넌트 함수의 리렌더링 방지: React.memo.
//컴포넌트의 props가 바뀌지 않으면, 리렌더링하지 않도록 설정해 함수 컴포넌트의 리렌더링 성능 최적화 가능
export default React.memo(TodoListItem);