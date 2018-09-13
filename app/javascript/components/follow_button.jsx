import React, {Component} from "react"
import PropTypes from "prop-types"
import {csrfToken} from "rails-ujs"

const axiosBase = require("axios");
const axios = axiosBase.create({
  headers: {
    'Content-Type': 'application/json',
    "X-CSRF-Token": csrfToken(),
  },
  responseType: "json"
});


export default class FollowButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relationship: props.relationship
    }
  }

  follow = () => {
    axios.post("/relationships.json", {
      followed_id: this.props.user.id
    }).then((response) => {
      const {relationship, followers_count} = response.data;
      this.setState({
        relationship
      });
      $("#followers").html(followers_count);
    });
  };

  unfollow = () => {
    axios.delete(`/relationships/${this.state.relationship.id}.json`
    ).then((response) => {
      console.log(response);
      const {relationship, followers_count} = response.data;
      this.setState({
        relationship
      });
      $("#followers").html(followers_count);
    });
  };

  render() {
    const isFollowing = this.state.relationship !== null;
    var className = "btn btn-lg btn-block";
    if (!isFollowing) className += " btn-primary";
    return (
        <div id="follow_form">
          <button className={className}
                  onClick={isFollowing ? this.unfollow : this.follow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
    )
  }
}

FollowButton.defaultProps = {
  relationship: null
};

FollowButton.propTypes = {
  user: PropTypes.object.isRequired,
  relationship: PropTypes.object
};
