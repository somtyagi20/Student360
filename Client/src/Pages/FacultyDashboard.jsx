import "./FacultyDashboard.css";
import image from "../assets/nar.jpg";


const user = {
        name: "Narendra Pal Singh Rathore",
        class: "Cs Department",
        img: image,
    }
    const FacultyDashboard = () => {
    return (
        <div className="Faculty-header">
        <img src={user.img} alt="" className="user-image"/>
        <div className="ft-background"></div>
        <div className="ft-details">
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
   }
export default FacultyDashboard;