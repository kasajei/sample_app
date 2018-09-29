module UsersHelper
  def gravatar_url(user, size:80)
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
  end

  def gravatar_for(user, size:80)
    image_tag(gravatar_url(user, size), alt:user.name, class:"gravatar")
  end
end
