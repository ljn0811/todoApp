//새로운 항목을 입력, 추가할 수 있음
//state를 통해 인풋의 상태를 관리
import {useState, useCallback} from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    //submit 이벤트는 인풋에서 엔터를 눌렀을 때도 발생
    //버튼에서 onClick만 사용 시 인풋에서 onKeyPress 이벤트를 따로 설정해야함
    const onSubmit = useCallback(
        e => {
        onInsert(value);
        setValue(''); //value 값 초기화

        //submit 이벤트는 브라우저에서 새로고침을 발생시킴
        //이를 방지하기 위해 이 함수를 호출
        e.preventDefault();        
        },
        [onInsert, value],    
    )

    return (
        <form className='TodoInsert' onSubmit={onSubmit}>
            <input
                placeholder='할 일을 입력하세요'
                value={value}
                onChange={onChange}
            />
            <button type='submit'>
                <MdAdd/>
            </button>
        </form>
    );
};

export default TodoInsert;
