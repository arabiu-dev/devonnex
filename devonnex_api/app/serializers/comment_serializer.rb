# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :content, :created_at

  belongs_to :post
  belongs_to :user
end
