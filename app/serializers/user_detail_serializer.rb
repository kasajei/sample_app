class UserDetailSerializer < UserSerializer
  attributes :followers_count, :following_count

  def followers_count
    object.followers.count
  end

  def following_count
    object.following.count
  end
end
