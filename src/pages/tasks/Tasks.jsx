import '../tasks/tasks.css';
import Task from "../../Components/tasksComponent/Task";
import axios from 'axios';
import { useRef, useState } from 'react';
import { IoAdd } from "react-icons/io5";

function Tasks() {
  const [isCheck, setIsCheck] = useState(true);
  const taskRef = useRef();
  const noteRef = useRef();
  const iconRef = useRef();

  const handleSave = async () => {
    if (taskRef.current.value === '' || noteRef.current.value === '') {
      setTimeout(() => {
        const saved = document.querySelector('#required');
        saved.innerText = 'please complete all fields!';
        saved.style.display = 'block';
      }, 500);

      setTimeout(() => {
        const saved = document.querySelector('#required');
        saved.innerText = '';
        saved.style.display = 'none';
      }, 3000);
    } else {
      await axios.post('http://localhost:5000/task', {
        task: taskRef.current.value,
        note: noteRef.current.value
      });

      taskRef.current.value = '';
      noteRef.current.value = '';

      setTimeout(() => {
        const saved = document.querySelector('#saved-message');
        saved.innerText = 'saved successfully';
        saved.style.display = 'block';
      }, 500);

      setTimeout(() => {
        const saved = document.querySelector('#saved-message');
        saved.innerText = '';
        saved.style.display = 'none';
      }, 3000);

      setTimeout(() => location.reload(), 2000);
    }
  };

  const colorfull = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 90%)`;
  };
  return (
        <div id="task-wrapper">
          <div className="fade fade-top"></div>
          <div className="fade fade-bottom"></div>
          <label
            style={{ backgroundColor: 'white' }}
            onClick={() => {
              const fill = document.querySelector('.content');
              if (isCheck === true) {
                fill.style.visibility = 'visible';
                fill.style.height = '250px';
                iconRef.current.style.transform = 'rotate(90deg)';
                setIsCheck((prev) => !prev);
                console.log(isCheck);
              } else {
                fill.style.visibility = 'hidden';
                fill.style.height = 0;
                iconRef.current.style.transform = 'rotate(0deg)';
                setIsCheck((prev) => !prev);
                console.log(isCheck);
              }
            }}
            htmlFor="add-toggle"
            id="add"
            title="Click to add a task"
          >
            <div id="add-icon">
              <IoAdd ref={iconRef} />
            </div>
            <p>create new task</p>
          </label>
          <input id="add-toggle" type="checkbox" />

          <div className="content">
            <input ref={taskRef} className='task' type="text" placeholder='what is the task?' />
            <br />
            <textarea ref={noteRef} name="notes" placeholder='write a notes...(something meaningfull please.)' className="notes"></textarea>
            <br />
            <button className='save' onClick={handleSave}>save</button>
            <p id='saved-message'></p>
            <p id="required">hello</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Task />
          </div>
        </div>
  );
}

export default Tasks;