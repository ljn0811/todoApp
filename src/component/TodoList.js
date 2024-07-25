//todos 배열을 props로 받아온 후 이를 배열 내장 함수 map을 이용하여 여러 개의 TodoListItem 컴포넌트로 변환하여 보여 줌
import React, {useCallback} from 'react';
import { List } from 'react-virtualized';
import TodoListItem from "./TodoListItem";
import './TodoList.scss';

//props로 받아 온 todos 배열을 배열 내장 함수 map을 통해 배열로 변환하여 렌더링
//map 사용해 컴포넌트로 변환할 때는 key props를 전달해 주어야 함
//key 값은 각 항목마다 가지고 있는 고유값을 넣어야 함
//todo 데이터는 통째로 props로 전달 >> 여러 종류의 값을 전달해야 한느 경우 객체로 통째로 전달하는 편이 나중에 성능 최적화 시 편리
const TodoList = ({ todos, onRemove, onToggle }) => {
    const rowRenderer = useCallback(({index, key, style}) => {
        const todo = todos[index];
        return (
            <TodoListItem
                todo={todo}
                key={key}
                onRemove={onRemove}
                onToggle={onToggle}
                style={style}
            />
        );
    },
        [onRemove, onToggle, todos],
    );
    return (
        <List
            className='TodoList'
            width={512} //전체 크기
            height={513} //전체 높이
            rowCount={todos.length} //항목 개수
            rowHeight={57} //항목 높이
            rowRenderer={rowRenderer} //항목을 렌더링할 때 쓰는 함수
            list={todos} //배열
            style={{ outline : 'none' }} //list에 기본 적용되는 outline 스타일 제거
        />
    );
};

export default React.memo(TodoList);