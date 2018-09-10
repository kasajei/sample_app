require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { User.new(
      name:"example", email:"user@example.com",
      password: "foobar", password_confirmation: "foobar"
  ) }

  it "should valid" do
    expect(user).to be_valid
  end

  it "name should be present" do
    user.name = ""
    expect(user).to_not be_valid
    expect(user.errors[:name]).to include("can't be blank")
  end

  it "email should be saved as lower-case" do
    mixied_case_email = "Foo@ExamPle.Com"
    user.email = mixied_case_email
    user.save
    expect(user.reload.email).to eq mixied_case_email.downcase
  end

  it "authenticated? should return false for a user with nil digest" do
    expect(user.authenticated?(:remember, "")).to be_falsey
  end

  it "associated microposts should be destroyed" do
    user.save
    user.microposts.create!(content: "Lorem ipsum")
    expect { user.destroy }.to change{ Micropost.count }.by(-1)
  end

  it "should follow and unfollow a user" do
    michael = create :michael
    archer =  create :archer
    expect(michael.following?(archer)).to be_falsey
    michael.follow(archer)
    expect(michael.following?(archer)).to be_truthy
    expect(archer.followers.include?(michael)).to be_truthy
    michael.unfollow(archer)
    expect(michael.following?(archer)).to be_falsey
  end

end
