# frozen_string_literal: true

class User < ApplicationRecord
  has_many :links
  has_many :skills
  has_many :posts
  has_many :talents
  has_many :gigs
  has_many :comments
  has_many :proposals
  has_many :reviews

  validates :full_name, presence: true
  validates :username, presence: true
  validates :image_url, presence: true
  validates :work_email, presence: true
  validates :phone_number, presence: true
  validates :bio, presence: true
  validates :revenue, numericality: { greater_than_or_equal_to: 0 }, presence: true
  validates :rating, numericality: { greater_than_or_equal_to: 0 }, presence: true

  def set_id(id)
    self.id = id
  end
end
