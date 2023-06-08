# frozen_string_literal: true

class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :from_user, :to_user, :content, :created_at

  belongs_to :gig
  belongs_to :user
end
