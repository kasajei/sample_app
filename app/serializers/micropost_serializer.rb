class MicropostSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :content, :picture, :created_at, :time_ago
  belongs_to :user, serializer: UserSerializer

  def time_ago
    time_ago_in_words(object.created_at)
  end
end
