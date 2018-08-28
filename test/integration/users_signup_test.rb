require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  test "invalid signup information" do
    get signup_path
    assert_select "form[action='/signup']"
    assert_no_difference "User.count" do
      post users_path, params:{
        user:{
          name: "",
          email: "user@invalid",
          password: "foo",
          password_confirmation: "bar"
        }
      }
    end
    assert_template "users/new"
    assert_select "div.alert"
    assert_select "div#error_explanation"
  end

  test "valid signup information" do
    get signup_path
    assert_difference "User.count", 1 do
      post users_path, params:{
        user:{
          name: "Example name",
          email: "user@example.com",
          password: "foobar",
          password_confirmation:"foobar"
        }
      }
    end
    follow_redirect!
    assert_template "users/show"
    assert_not flash.empty?
    assert_select "div.alert-success"
    get user_path
    assert flash.empty?
    assert_select "div.alert-success", false

    assert is_logged_in?
  end
end
