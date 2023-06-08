# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :image_url, :readtime, :topic, :tags, :created_at

  has_many :comments
  has_many :paragraphs
  belongs_to :user
end
