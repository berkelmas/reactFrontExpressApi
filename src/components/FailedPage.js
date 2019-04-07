import React, { Component } from 'react'

class FailedPage extends Component {

  goLogin() {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <p>Giriş Başarısız...</p>
        <button onClick={this.goLogin.bind(this)}>Tekrar Dene</button>
      </div>
    )
  }
}

export default FailedPage;