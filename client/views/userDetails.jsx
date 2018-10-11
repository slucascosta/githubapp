var React = require('react');

class UserDetails extends React.Component {
  render() {
  return <div>
    <title>{this.props.name} - GithubApp</title>
    <p><a href='javascript:history.back();'>Voltar</a></p>
    <div>Id: {this.props.id}</div>
    <div>Login: {this.props.login}</div>
    <div>Profile Url: <a target='_blank' href={this.props.url}>{this.props.url}</a></div>
    <div>Login Creation: {this.props.createdAt}</div>
    <p>
      <table>
        {this.props.repos.map(repo =>
          { if (!repo.private)
            return (
              <tr key={repo.id}>
                <td>{repo.id}</td>
                <td>{repo.name}</td>
                <td><a target='_blank' href={repo.html_url}>{repo.html_url}</a></td>
              </tr>)
          }
        )}
      </table>
    </p>
  </div>;
  }
}

module.exports = UserDetails;