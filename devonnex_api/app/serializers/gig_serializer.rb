# frozen_string_literal: true

class GigSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :location, :payment_amount, :payment_per, :duration, :overview, :status,
             :no_of_freelancers, :offered_to, :created_at, :category

  has_many :proposals
  has_many :sections
  has_many :reviews
  belongs_to :user
end
