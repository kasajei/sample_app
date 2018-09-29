require 'rails_helper'

RSpec.describe "FollowAPI", type: :request do
  include UsersHelper
  let(:headers) do
    {'Content-Type' => 'application/json', 'Accept' => 'application/json'}
  end

  before do
    @user = create :michael
    @other_user = create :archer
  end

  it "get user information by json api", focus:true do
    get user_path(@user), headers: headers
    expect(response.status).to eq 200
    expect(response.body).not_to be_empty
    json = JSON.parse(response.body)
    expect(json.keys).to include("id", "name", "icon_url", "followers_count", "following_count")
    expect(json["id"]).to eq @user.id
    expect(json["name"]).to eq @user.name
    expect(json["icon_url"]).to eq gravatar_url(@user)
    expect(json["followers_count"]).to eq @user.followers.count
    expect(json["following_count"]).to eq @user.following.count
  end

end
