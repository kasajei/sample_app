import React, {Component} from "react"
import PropTypes from "prop-types"
import {csrfToken} from "rails-ujs"
import Popover from '@material-ui/core/Popover'

const axiosBase = require("axios");
const axios = axiosBase.create({
  headers: {
    'Content-Type': 'application/json',
    "X-CSRF-Token": csrfToken(),
  },
  responseType: "json"
});

class UserProfile extends Component {
  render() {
    if (!this.props.userDetail) return (<div style={{width: 200, height: 200}}/>);
    const user = this.props.userDetail;
    return (
        <div style={{width: 200, height: 200}}>
          <section className="user_info">
            <a href={`/users/${user.id}`}>
              <img className="gravatar" src={user.icon_url} width={50}/>
              {user.name}
            </a>
          </section>
          <section className="stats">
            <div className="stats">
              <a href="">
                <strong id="following" className="stat">
                  {user.following_count}
                </strong>
                following
              </a>
              <a href="">
                <strong id="followers" className="stat">
                  {user.followers_count}
                </strong>
                followers
              </a>
            </div>
          </section>
        </div>
    )
  }
}

export default class Micropost extends Component {
  constructor(props) {
    super(props);

    var micropost = props.micropost_json ?
        JSON.parse(props.micropost_json) : null;

    this.state = {
      micropost: micropost,
      anchorEl: null,
    }
  }

  handlePopoverOpen = event => {
    axios.get(`/users/${this.state.micropost.user.id}.json`
    ).then((response) => {
      const {user, following_count, followers_count} = response.data;
      this.setState({
        userDetail: response.data
      });
    });
    this.setState({anchorEl: event.currentTarget})
  };

  handlePopoverClose = () => {
    this.setState({anchorEl: null});
  };

  deletePost = () => {
    const res = confirm("Are you sure?");
    if (res) {
      axios.delete(
          `/microposts/${this.state.micropost.id}.json`
      ).then((response) => {
        this.setState({micropost: null});
        const {micropost_count} = response.data;
        $("#micropost_count").html(`Microposts (${micropost_count})`);
      })
    }
  };

  render() {
    const micropost = this.state.micropost;
    if (!micropost) return (<div/>);

    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return (
        <li id={`micropost-${micropost.id}`}>
          <div style={{width: 50}}
               onMouseEnter={this.handlePopoverOpen}
               onMouseLeave={this.handlePopoverClose}
          >
            <a href={`/users/${micropost.user.id}`}>
              <img className="gravatar" src={micropost.user.icon_url} width={50}/>
            </a>
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onClose={this.handlePopoverClose}
                disableRestoreFocus
            >
              <UserProfile userDetail={this.state.userDetail}/>
            </Popover>
          </div>
          <a href={`/users/${micropost.user.id}`}>
            <span className="user">{micropost.user.name}</span>
          </a>
          <span className="content">{micropost.content}</span>
          {micropost.picture.url && <img src={micropost.picture.url}/>}
          <span className="timestamp">Posted {micropost.time_ago} ago.
            {
              this.props.current_user.id === micropost.user.id &&
              <a onClick={this.deletePost}> delete</a>
            }
          </span>
        </li>
    )
  }
}

Micropost.defaultProps = {
  micropost_json: null,
};

Micropost.propTypes = {
  micropost_json: PropTypes.string,
  current_user: PropTypes.object.isRequired,
};
