import React from 'react';
import { hashHistory } from 'react-router';

class FacebookPost extends React.Component {
  constructor(props) {
    super(props);

    console.log('FacebookPost props', this.props);

    this.state = {
      hasPosted: false,
      statusMsg: '',
      photoUrl: '/collages/collage-' + this.props.params.arcId + '.jpeg'
    }
  }

  shareCollageToFacebook() {
    console.log('shareCollageToFacebook Called');
    this.setState({ statusMsg: 'Uploading your collage...' });

    FB.api(
      'me/photos',
      'post',
      {
        message: 'Example Photo Share',
        status: 'success',
        url: this.state.photoUrl,
        access_token: sessionStorage.getItem('access_token'),
      },
      function(response) {
        console.log('FacebookPost shareCollageToFacebook', response);
        if (response.id) {
          console.log('FacebookPost shareCollageToFacebook Success');
          this.setState({ statusMsg: 'Shared to timeline!' });
        }
      }.bind(this)
    );
  }

  render() {
    console.log('FacebookPost render');

    return (
      <div>
        <h2 className="page-title">Share Your Collage</h2>
        <div className="gallery-container">
          <div><img src={this.state.photoUrl} /></div>
          <div><button type="button" onClick={this.shareCollageToFacebook.bind(this)}>Share on Facebook</button></div>
          <div className="statusMsg">{this.state.statusMsg}</div>
        </div>
      </div>
    )
  }
};

export default FacebookPost;
