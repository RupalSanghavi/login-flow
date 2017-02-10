import React, {Component} from 'react';

class TeamInfoComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
        teamName: ""
    };

  }
  render(){
    <div>
      <h2>Team Name</h2>
      <hr></hr>
      <div className="row">
        <div className="col-lg-4">
            <h4>STUDENTS</h4>
            <h4>FORMS</h4>
            <h4>SPRINTS</h4>
            <h4>CALENDAR</h4>
        </div>
      </div>
    </div>
  }
}
export default TeamInfoComponent;
