# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :image_url, :work_email, :phone_number, :bio, :revenue, :rating, :expertise

  has_many :links
  has_many :skills
  has_many :posts
  has_one :talents
  has_many :gigs
  has_many :proposals
  has_many :comments
  has_many :reviews
end
