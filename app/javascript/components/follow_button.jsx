import React, {Component} from "react"
import PropTypes from "prop-types"
import {csrfToken} from "rails-ujs"

export default class FollowButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      relationship: props.relationship
    }
  }

  follow = () => {
    $.ajax({
      type: 'POST',
      url: `/relationships`,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        followed_id: this.props.user.id
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", csrfToken())
      }
    }).then((response) => {
      const {relationship, followers_count} = response;
      this.setState({
        relationship
      });
      $("#followers").html(followers_count);
    })
  };

  unfollow = () => {
    $.ajax({
      type: "DELETE",
      url: `/relationships/${this.state.relationship.id}`,
      contentType: "application/json",
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-CSRF-Token", $("meta[name='csrf-token']").attr("content"))
      }
    }).then((response) => {
      const {relationship, followers_count} = response;
      this.setState({
        relationship: relationship
      });
      $("#followers").html(followers_count);
    })
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
