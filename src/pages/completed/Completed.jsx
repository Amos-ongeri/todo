import Background from "../../Components/backgroundComponent/Background";
import '../completed/completed.css';
import Complete from "../../Components/completeTaskComponent/Complete";
import { useState } from "react";
import axios from "axios";

function Completed({ background }) {
  const [complete, setComplete] = useState([]);
  const _delete = async () => {
    await axios.delete('http://localhost:5000/clear').then((res) => {
      setComplete([]);
    });
  };
  return (
        <div className="complete-padding">
          <div className="clear">
            <button onClick={_delete} id="delete" title="This action can't be reversed">
              clear
            </button>
          </div>
          <Complete complete={complete} setComplete={setComplete} />
        </div>
  );
}

export default Completed;