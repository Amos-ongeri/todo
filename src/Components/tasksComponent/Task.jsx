import { useEffect, useState } from 'react';
import '../tasksComponent/task.css';
import axios from 'axios';

export default function Task(){
    const [tasks, setTasks] = useState([]);
  

    const taskWithFaintColor = ()=> {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 90%)` 
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/tasks')
        .then((res)=> {
            console.log(res.data)
            const taskWithBg = res.data.map((task)=>({
                ...task,
                bgColor: taskWithFaintColor(),
            }));
            setTasks(taskWithBg)
    }
    )
        .catch((err)=> console.error(err.message)
        )
    }, [])

    const complete = async (taskId)=>{
        try{
        await axios.post(`http://localhost:5000/tasks/${taskId}/completed`)

        setTimeout(()=>{setTasks((prev)=> prev.filter(p=> p._id !== taskId))},500)
        }catch(err){
            console.error('error completing task', err);
            
        }
    }
    
    return (
      <div className="task-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {[...tasks].reverse().map((t) => (
          <div className="task-todo" key={t._id}>
            <input onChange={() => complete(t._id)} className='complete' id={`task-${t._id}`} type="checkbox" />
            <label htmlFor={`task-${t._id}`} id='custom-check' title='mark as complete'></label>
            <p className="task-details" style={{ backgroundColor: t.bgColor }}>{t.task}</p>
          </div>
        ))}
      </div>
    );
}
