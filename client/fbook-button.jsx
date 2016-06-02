import React from 'react'; 
import $ from 'jquery'; 
import { browserHistory } from 'react-router';


class FacebookButton extends React.Component {
  constructor (props) {
    super(props); 

    this.state = {
      authenticated: false
    }

    this.handleClick = this.handleClick.bind(this)
    // this.onStatusChange = this.onStatusChange.bind(this);
    // this.checkLoginState = this.checkLoginState.bind(this);
  }

  // componentDidMount() {
  //   // this.FB.Event.subscribe('auth.logout', 
  //   //   this.onLogout.bind(this)); 
  //   // this.FB.Event.subscribe('auth.statusChange', 
  //   //   this.onStatusChange.bind(this)); 
  // }
  componentDidMount () {
    var self = this; 
    console.log('component did componentDidMount'); 
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '477241942472397',
        xfbml      : true,
        version    : 'v2.6'
      });
      console.log('init fbook', window.FB);
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  checkLoginState () {
    var self = this;  
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        self.setState({authenticated: true});     
      } else {
        FB.login(function(response) {
          console.log(response, 'outside api call')
          if (response.authResponse) {
            FB.api('/me', function(response) {
              self.setState({authenticated: true});
              console.log(response); 
              $.post('/user', {name: response, accessToken: response}); 
            })
            // probably going to to do the browserHistory.push('path') here
          } else {
            console.log('user did not fully authenticate'); 
          }
        })
      }
    }, true)
  }

  logout () {
    var self = this; 
    FB.logout(function(response) {
      self.setState({authenticated: false}); 
      console.log
    })
  }

  handleClick (e) {
    e.preventDefault(); 
    console.log('handleClick', this.state.authenticated); 
    if (this.state.authenticated) {
      this.logout(); 
    } else {
      this.checkLoginState();  
    }
  }


  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.authenticated ? "Logout" : "Log in with Facebook"}</button>
        <div></div> 
      </div>
    ); 
  }
}

export default FacebookButton; 