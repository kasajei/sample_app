require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
  end


  test "layout links" do
    get root_path
    assert_template 'static_pages/home'
    assert_select "a[href=?]", users_path, count:0
    assert_select "a[href=?]", root_path, count:2
    assert_select "a[href=?]", help_path
    assert_select "a[href=?]", about_path
    assert_select "a[href=?]", contact_path
    assert_select "a[href=?]", signup_path
    get contact_path
    assert_select "title", full_title("Contact")

    get signup_path
    assert_select "title", full_title("Sign up")

    get users_path
    assert_redirected_to login_path
  end

  test "layout links for logined user" do
    log_in_as(@user)
    get root_path
    assert_select "a[href=?]", users_path
    assert_select "a[href=?]", edit_user_path(@user)
    assert_select "a[href=?]", user_path(@user)
    assert_select "a[href=?]", logout_path

    get users_path
    assert_template "users/index"
    get edit_user_path(@user)
    assert_template "users/edit"
    get user_path(@user)
    assert_template "users/show"
    delete logout_path
    assert_redirected_to root_path
  end
end
