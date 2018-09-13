class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :icon_url

  def icon_url
    size = 80
    gravatar_id = Digest::MD5::hexdigest(object.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    gravatar_url
  end
end
