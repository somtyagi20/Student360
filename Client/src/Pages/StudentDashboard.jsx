import "./StudentDashboard.css";
import image from "../assets/Avatar 5.png";

const user = {
  name: "Active Panda",
  class: "CS-4",
  img: image,
}
const StudentDashboard = () => {
  return (
    <div className="Student-header">
    <img src={user.img} alt="" className="user-image"/>
    <div className="st-background"></div>
    <div className="st-details">
    <div className="details">
    <b>Name: </b>
    <span>{user.name}</span>
    <br />
    <b>Class: </b>
    <span>{user.class}</span>
    </div>
    </div>
    </div>
  );
}; 
export  default  StudentDashboard;

