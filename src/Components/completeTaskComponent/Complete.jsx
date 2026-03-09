import "../completeTaskComponent/complete.css"
import axios from "axios";
import { format } from 'date-fns';
import { useEffect } from 'react';

const Complete = ({complete, setComplete}) => {

    const completeColorfull = ()=>{
        const hue = Math.floor(Math.random() * 360);

        return `hsl(${hue}, 70%, 90%)`
    }

    useEffect(()=>{
        axios.get('http://localhost:5000/completed')
        .then((res)=>{
            console.log(res.data);
            const completedBG = res.data.map((comp)=>({
                ...comp,
                bgColor: completeColorfull()
            }))
            setComplete(completedBG);
        })
        .catch((err)=>{
            console.error('error',err);
        })
    },[])
  return (
    <div className="complete-list">
      {[...complete].reverse().map((c) => (
        <div className="complete-card" style={{ backgroundColor: c.bgColor }} key={c._id}>
          <div className="complete-info">
            <p className="complete-icon" role="img" aria-label="done">✅</p>
            <p className="complete-task">{c.task}</p>
          </div>
          <div className="complete-date">
            <p>Completed on {format(new Date(c.createdAt), 'PPP p')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Complete