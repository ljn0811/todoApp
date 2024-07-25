import {useReducer, useState, useRef, useCallback} from 'react';
import TodoTemplate from "./component/TodoTemplate";
import TodoInsert from "./component/TodoInsert";
import TodoList from './component/TodoList';

function createBulkTodos(){
  const array = [];
  for(let i=1; i <= 2500; i++){
    array.push({
      id : i,
      text : `할 일 ${i}`,
      checked : false,
    });
  }

  return array;
}

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT' :
      //새로 추가
      //{ type : 'INSERT', todo : { id: 1, text: 'todo', checked: false}}
      return todos.concat(action.todo);
    case 'REMOVE' :
      //제거
      //{ type : 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE' :
      //토글
      //{ type : 'REMOVE', id: 1}
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked} : todo,);
    default : 
      return todos;  
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  //todos 배열 객체는 TodoList에 props로 전달
  //파라미터를 함수 형태를 넣어 주면 컴포넌트가 처음 렌더링될 때만 createBulkTodos 함수가 실행
  //const [todos, setTodos] = useState(createBulkTodos);

  //고윳값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(250);

  //todos 배열에 새 객체를 추가하는 함수
  //새로운 객체를 생성할 때마다 id 값에 1씩 더해야함
  //id값은 useRef를 사용하여 관리
  //컴포넌트의 성능을 아낄 수 있게 useCallback으로 감쌈
  const onInsert = useCallback(text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo})
      //함수형 업데이트: 상태 업데이트를 어떻게 할 지 정의해 주는 업데이트 함수
      //setTodos(todos => todos.concat(todo));
      nextId.current += 1; //nextId 1씩 더하기
    }, []);

  //id를 파라미터로 받아 와 같은 id를 가진 항목을 todos 배열에서 지우는 함수
  //항목 삭제 함수
  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id});
      //setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []);

  //항목 수정 함수
  //배열 내장 함수 map을 사용해 특정 id를 갖고 있는 객체의 checked 값을 반전
  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id});
      //setTodos(todos => todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo,),);
    }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  )
};

export default App;

