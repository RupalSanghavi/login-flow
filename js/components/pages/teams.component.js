import React, {Component} from 'react';
import './TeamComponent.css'
import TeamInfoComponent from './teaminfo.component.js'

class TeamsComponent extends Component {
  constructor(props){
    super(props);
    this.state = { teams: [] };
    this.getTeamsData = this.getTeamsData.bind(this);

  }
  getTeamsData(){
    var request = require('superagent');
    const url = "http://private-e371d8-temp54.apiary-mock.com/teams";
    var teamsMap = [];
    request
      .get(url)
      .accept('application/json')
      .then(function(res){
        for(var team of res.body.teams){
          teamsMap.push(team.id);
        }
        return res;
      })
      .then((res) => this.setState({
        teams: teamsMap.map(
        (team) => this.createTeamComponent(team,team.id)
                        )}
                      )
    )
    //  debugger;
  // .then((res) => this.setState({componentList: members.map(
  //     (member) => this.createTeamMemberComponent(member, res.body.scrum_master, res.body.scribe)),
  //     blogLink: res.body.blog_link,
  //     teamName: res.body.name})
  // )
  }
  createTeamComponent(team, id){
    return <TeamComponent key={team} name={team} />;
  }
  componentWillMount(){
    this.getTeamsData();
  }
  render(){
      return (
          <div className="row">
            <div className="col-sm-12 text-center">

              {this.state.teams}

            </div>
          </div>
      );
    }
  }


class TeamComponent extends Component {

    constructor(props) {
      super(props);
      this.state = {componentList: [],
                    blogLink: "",
                    teamName: "",
                    showComponent: false};
      this.getTeamData = this.getTeamData.bind(this);
      this.onTeamClick = this.onTeamClick.bind(this);
      // this.createTeamInfoComponent = this.createTeamInfoComponent.bind(this);
    }

    getTeamData() {
      var request = require('superagent');
      const url = "http://private-e371d8-temp54.apiary-mock.com/team/" + this.props.name;
      var members = [];
      request
        .get(url)
        .accept('application/json')
        .then(function(res) {
          for(var name of res.body.members) {
            members.push(name.first_name + " " + name.last_name);
          }
          return res;
        })
        .then((res) => this.setState({componentList: members.map(
            (member) => this.createTeamMemberComponent(member, res.body.scrum_master, res.body.scribe)),
            blogLink: res.body.blog_link,
            teamName: res.body.name})
        )
    }

    createTeamMemberComponent(member, scrum, scribe) {
      if(member === scrum)
        return <TeamMemberComponent key={member} name={member} scrum="true"/>;
      else if(member === scribe)
        return <TeamMemberComponent key={member} name={member} scribe="true"/>;
      else
        return <TeamMemberComponent key={member} name={member}/>;
    }
    createTeamInfoComponent(){
        return(
          <TeamInfoComponent/>
        );
    }
    onTeamClick(){
      this.setState({
        showComponent: true,
      });
    }
    componentWillMount() {
      this.getTeamData();
    }
    render() {
      return (
          <div id="team-component">
            <table id="team-table">
              <tbody>
              <tr><th onClick = {this.onTeamClick}>{this.state.teamName}</th></tr>
                {this.state.componentList}
                <tr><td><div id="blog-box"><a href={this.state.blogLink}>Team Blog</a></div></td></tr>
              </tbody>
            </table>
              <br></br>
          </div>


      );
    }
  }



  class TeamMemberComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showStudentInfo: false,
      }
      this.createRow = this.createRow.bind(this);
      this.toggleStudentInfo = this.toggleStudentInfo.bind(this);
    }
    componentWillMount(){

    }
    toggleStudentInfo() {
      this.setState({showStudentInfo: !this.state.showStudentInfo});
    }
    createRow() {
      if(this.props.scrum) {
        return (
          <td className="member-info" onClick={this.toggleStudentInfo}>
            <div className="flex-container">
              <img className="profile item" src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Bae_Suzy_at_%22Uncontrollably_Fond%22_press_conference,_4_July_2016_05.jpg"></img>
              <span className="member-name">{this.props.name}</span>
              <div className="job-box"><img className="job-img" src="http://iconshow.me/media/images/Mixed/line-icon/png/256/star-256.png"></img></div>
            </div>
            {this.state.showStudentInfo ? <StudentInfoComponent callback={this.toggleStudentInfo}/> : null}
          </td>);
      }
      else if(this.props.scribe) {
        return (
          <td className="member-info" onClick={this.toggleStudentInfo}>
            <div className="flex-container">
              <img className="profile item" src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Bae_Suzy_at_%22Uncontrollably_Fond%22_press_conference,_4_July_2016_05.jpg"></img>
              <div><span className="member-name">{this.props.name}</span></div>
              <div className="job-box"><img className="job-img" src="https://cdn3.iconfinder.com/data/icons/business-reports/512/script-512.png"></img></div>
            </div>
            {this.state.showStudentInfo ? <StudentInfoComponent callback={this.toggleStudentInfo}/> : null}
          </td>);
      }
      else {
        return (
          <td className="member-info" onClick={this.toggleStudentInfo}>
            <div className="flex-container">
              <img className="profile item" src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Bae_Suzy_at_%22Uncontrollably_Fond%22_press_conference,_4_July_2016_05.jpg"></img>
              <span className="member-name item">{this.props.name}</span>
            </div>
            {this.state.showStudentInfo ? <StudentInfoComponent callback={this.toggleStudentInfo}/> : null}
          </td>);
      }
    }
    render() {
      return (
        <tr>
          {this.createRow()}
        </tr>
      );
    }
  }

  export default TeamsComponent;
