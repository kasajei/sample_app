require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  before do
    @user = create :michael
    @other_user = create :archer
  end

  it "should redirect index when not logged in" do
    get :index
    expect(response).to redirect_to login_url
  end

  it "should get new" do
    get :new
    expect(response).to have_http_status :success
  end

  it "should redirect edit when not logged in" do
    get :edit, params:{ id: @user.id }
    expect(flash.empty?).to be_falsey
    expect(response).to redirect_to login_url
  end

end
