var React = require('react');

class ListUsers extends React.Component {
  render() {
  return <div>
    <title>GithubApp</title>
    {this.props.data.map(
      user =>
        <div key={user.id}>{user.id} - <a href={'/users/' + user.login + '/details'}>{user.login}</a></div>)}
    <a href={this.props.first}>Primeira</a>
    <span> - </span>
    <a href={this.props.next}>Próxima</a>
  </div>;
  }
}

module.exports = ListUsers;