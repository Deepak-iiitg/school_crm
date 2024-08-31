import '../App.css';

function Navbar(){
    return (<div className='navbar'>
        <div className='left-nav'>School CRM</div>
        <div className='right-nav'>
            <span>Add Class</span>
            <span>Add Teacher</span>
            <span>Add Student</span>
        </div>
    </div>);
}
export default Navbar;