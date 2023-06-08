# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :delete_all
  has_many :paragraphs, dependent: :delete_all

  validates :title, presence: true
  validates :topic, presence: true
  validates :image_url, presence: true
  validates :readtime, presence: true, numericality: { only_integer: true }
end
